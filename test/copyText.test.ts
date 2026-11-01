import { describe, test, expect, jest, afterEach } from "@jest/globals";
import { copyText } from "../src";

const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
const documentDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'document');

const mockNavigator = (value: unknown) => {
  Object.defineProperty(globalThis, 'navigator', { value, configurable: true, writable: true });
};

const mockDocument = (value: unknown) => {
  Object.defineProperty(globalThis, 'document', { value, configurable: true, writable: true });
};

afterEach(() => {
  if (navigatorDescriptor) {
    Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
  } else {
    delete (globalThis as { navigator?: unknown }).navigator;
  }
  if (documentDescriptor) {
    Object.defineProperty(globalThis, 'document', documentDescriptor);
  } else {
    delete (globalThis as { document?: unknown }).document;
  }
});

const createDocumentMock = (execCommandResult: boolean) => {
  const textarea = {
    value: '',
    style: {} as Record<string, string>,
    setAttribute: jest.fn(),
    select: jest.fn(),
  };
  const appendChild = jest.fn();
  const removeChild = jest.fn();
  const execCommand = jest.fn(() => execCommandResult);
  return {
    textarea,
    appendChild,
    removeChild,
    execCommand,
    document: {
      createElement: jest.fn(() => textarea),
      body: { appendChild, removeChild },
      execCommand,
    },
  };
};

describe('复制文本到剪贴板', () => {
  test('优先使用 navigator.clipboard', async () => {
    const writeText = jest.fn(() => Promise.resolve());
    mockNavigator({ clipboard: { writeText } });

    await copyText('hello');

    expect(writeText).toHaveBeenCalledWith('hello');
  });

  test('剪贴板失败时降级到 execCommand', async () => {
    const writeText = jest.fn(() => Promise.reject(new Error('denied')));
    mockNavigator({ clipboard: { writeText } });
    const { textarea, appendChild, removeChild, execCommand, document } =
      createDocumentMock(true);
    mockDocument(document);

    await copyText('hello');

    expect(writeText).toHaveBeenCalledWith('hello');
    expect(textarea.value).toBe('hello');
    expect(appendChild).toHaveBeenCalledWith(textarea);
    expect(removeChild).toHaveBeenCalledWith(textarea);
    expect(execCommand).toHaveBeenCalledWith('copy');
  });

  test('execCommand 失败时 reject', async () => {
    mockNavigator({});
    const { document } = createDocumentMock(false);
    mockDocument(document);

    await expect(copyText('hello')).rejects.toThrow('复制失败');
  });

  test('不支持复制到剪贴板的环境 reject', async () => {
    mockNavigator({});
    mockDocument(undefined);

    await expect(copyText('hello')).rejects.toThrow('当前环境不支持复制到剪贴板');
  });
});
