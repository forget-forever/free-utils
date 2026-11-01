import { describe, test, expect } from "@jest/globals";
import { formatFileSize } from "../src";

describe('文件大小格式化', () => {
  test('字节', () => {
    expect(formatFileSize(0)).toBe('0 B');
    expect(formatFileSize(512)).toBe('512 B');
  });

  test('KB', () => {
    expect(formatFileSize(1024)).toBe('1 KB');
    expect(formatFileSize(1536)).toBe('1.5 KB');
  });

  test('MB 和 GB', () => {
    expect(formatFileSize(1024 * 1024)).toBe('1 MB');
    expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
  });

  test('支持自定义小数位', () => {
    expect(formatFileSize(1536, 0)).toBe('2 KB');
    expect(formatFileSize(1610612736, 1)).toBe('1.5 GB');
  });

  test('非法输入返回 0 B', () => {
    expect(formatFileSize(-1)).toBe('0 B');
    expect(formatFileSize(Number.NaN)).toBe('0 B');
  });
});
