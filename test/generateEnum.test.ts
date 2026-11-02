import { describe, test, expect } from "@jest/globals"
import { generateEnum } from "../src"

describe('generate enum by the enum data', () => {
  const enumData = {
    ONLINE: { value: 1, text: '在线' },
    OFFLINE: { value: 0, text: '离线' },
  } as const

  test('generate options for the components', () => {
    expect(generateEnum(enumData).options).toEqual([
      { value: 1, label: '在线' },
      { value: 0, label: '离线' },
    ])
  })

  test('generate valueEnum to map value to text', () => {
    expect(generateEnum(enumData).valueEnum).toEqual({
      1: '在线',
      0: '离线',
    })
  })

  test('generate enum which keeps the real value', () => {
    expect(generateEnum(enumData).enum).toEqual({
      ONLINE: 1,
      OFFLINE: 0,
    })
  })

  test('keep the order of the enum data', () => {
    expect(generateEnum(enumData).options.map((ele) => ele.label)).toEqual(['在线', '离线'])
  })
})
