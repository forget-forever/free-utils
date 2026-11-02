import { describe, test, expect, beforeEach, afterEach, jest } from "@jest/globals"
import { selectFiles } from "../src"

interface FakeInput {
  accept?: string
  attrs: Record<string, string>
  listeners: Record<string, (e: unknown) => void>
  setAttribute: (k: string, v: string) => void
  addEventListener: (type: string, cb: (e: unknown) => void) => void
  click: () => void
}

let inputs: FakeInput[]

beforeEach(() => {
  inputs = []
  ;(global as any).document = {
    createElement: jest.fn(() => {
      const input: FakeInput = {
        attrs: {},
        listeners: {},
        setAttribute: jest.fn((k: string, v: string) => {
          input.attrs[k] = v
        }),
        addEventListener: jest.fn((type: string, cb: (e: unknown) => void) => {
          input.listeners[type] = cb
        }),
        click: jest.fn(),
      }
      inputs.push(input)
      return input
    }),
  }
})

afterEach(() => {
  delete (global as any).document
})

const select = (files: { size: number }[]) => {
  const input = inputs[inputs.length - 1]
  input.listeners['change']({ target: { files } })
}

describe('select files by a promise', () => {
  test('opens a file input with the default config', async () => {
    const promise = selectFiles()

    const input = inputs[0]
    expect(input.attrs['type']).toBe('file')
    expect(input.attrs['multiple']).toBe('multiple')
    expect(input.accept).toBe('.xls,.xlsx')
    expect(input.click).toHaveBeenCalledTimes(1)

    select([])
    await expect(promise).resolves.toEqual([])
  })

  test('opens a file input with a custom config', async () => {
    const promise = selectFiles({ accept: 'image/png', maxFiles: 2, sizeLimit: 1 })

    const input = inputs[0]
    expect(input.accept).toBe('image/png')

    select([])
    await expect(promise).resolves.toEqual([])
  })

  test('resolves the selected files', async () => {
    const promise = selectFiles({ maxFiles: 3 })
    const files = [{ size: 10 }, { size: 20 }]
    select(files)

    await expect(promise).resolves.toBe(files)
  })

  test('rejects when the number of files is too large', async () => {
    const err = jest.fn()
    const promise = selectFiles({ maxFiles: 1, err })
    select([{ size: 1 }, { size: 2 }])

    await expect(promise).rejects.toThrow('文件过多，限制1个')
    expect(err.mock.calls[0][0]).toBeInstanceOf(Error)
  })

  test('rejects when the size of the file is too large', async () => {
    const promise = selectFiles({ sizeLimit: 0.5 })
    select([{ size: 1024 * 1024 }])

    await expect(promise).rejects.toThrow('文件过大，限制0.5mb')
  })

  test('does not throw when no error callback is passed', async () => {
    const promise = selectFiles({ maxFiles: 0 })
    select([{ size: 1 }])

    await expect(promise).rejects.toThrow('文件过多，限制0个')
  })

  test('rejects the previous pending promise when selecting files again', async () => {
    const first = selectFiles()
    const firstAssertion = expect(first).rejects.toBeUndefined()

    const second = selectFiles({ maxFiles: 2 })
    select([])

    await firstAssertion
    await expect(second).resolves.toEqual([])
  })
})
