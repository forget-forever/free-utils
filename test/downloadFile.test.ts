import { describe, test, expect, beforeEach, afterEach, jest } from "@jest/globals"
import { downloadFile } from "../src"

class FakeXHR {
  responseType = ''
  response: unknown = 'fake-blob'
  onload: (() => void) | null = null
  open = jest.fn()
  send = jest.fn()
}

let xhr: FakeXHR
let createObjectURL: jest.Mock
let anchor: {
  href: string
  target: string
  download: string
  style: { display?: string }
  click: jest.Mock
}
let createElement: jest.Mock

beforeEach(() => {
  xhr = new FakeXHR()
  createObjectURL = jest.fn(() => 'blob:mock-url')
  anchor = { href: '', target: '', download: '', style: {}, click: jest.fn() }
  createElement = jest.fn(() => anchor)

  ;(global as any).window = {
    XMLHttpRequest: jest.fn(() => xhr),
    URL: { createObjectURL },
  }
  ;(global as any).document = { createElement }
})

afterEach(() => {
  delete (global as any).window
  delete (global as any).document
})

describe('download file by a url', () => {
  test('download the file with a custom name', () => {
    const success = jest.fn()
    downloadFile('https://example.com/a.xlsx', 'report.xlsx', success)

    expect(xhr.open).toHaveBeenCalledWith('GET', 'https://example.com/a.xlsx', true)
    expect(xhr.responseType).toBe('blob')
    expect(xhr.send).toHaveBeenCalled()

    xhr.onload!()

    expect(createObjectURL).toHaveBeenCalledWith('fake-blob')
    expect(anchor.href).toBe('blob:mock-url')
    expect(anchor.download).toBe('report.xlsx')
    expect(anchor.click).toHaveBeenCalledTimes(1)
    expect(anchor.style.display).toBe('none')
    expect(success).toHaveBeenCalledTimes(1)
  })

  test('keeps the default name of the file when no name is passed', () => {
    downloadFile('https://example.com/a.xlsx')
    xhr.onload!()

    expect(anchor.download).toBe('')
    expect(anchor.click).toHaveBeenCalledTimes(1)
  })

  test('success is optional', () => {
    downloadFile('https://example.com/a.xlsx', 'a.xlsx')
    expect(() => xhr.onload!()).not.toThrow()
  })
})
