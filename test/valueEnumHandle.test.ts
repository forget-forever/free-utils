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

})