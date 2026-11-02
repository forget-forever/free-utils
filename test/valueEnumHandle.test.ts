import {test, expect, describe} from "@jest/globals";
import { valueEnumHandle } from "../src"


describe('将键值对，字符串数组转换成label，value这样的options数组', () => {
  const obj = {
    1: "key1",
    2: "key2"
  }

  test('to options array', () => {
    expect(valueEnumHandle(obj)).toEqual([
      { value: '1', label: 'key1' },
      { value: '2', label: 'key2' }
    ])
  })

  test('to options array number', () => {
    expect(valueEnumHandle(obj, {valueToNumber: true})).toEqual([
      { value: 1, label: 'key1' },
      { value: 2, label: 'key2' }
    ])
  })

})

describe('convert the valueEnum in different forms into options', () => {
  test('keep the string array as both value and label', () => {
    expect(valueEnumHandle(['a', 'b'])).toEqual([
      { value: 'a', label: 'a' },
      { value: 'b', label: 'b' },
    ])
  })

  test('keep the label/value objects as they are', () => {
    expect(valueEnumHandle([{ value: '1', label: '一' }])).toEqual([{ value: '1', label: '一' }])
  })

  test('put the all item at the first position', () => {
    expect(valueEnumHandle({ 1: '有', 2: '全部' })).toEqual([
      { value: '2', label: '全部' },
      { value: '1', label: '有' },
    ])
  })

  test('returns an empty options when the valueEnum is empty', () => {
    expect(valueEnumHandle({})).toEqual([])
    expect(valueEnumHandle([])).toEqual([])
  })
})
