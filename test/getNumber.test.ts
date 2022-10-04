import { describe, test, expect } from "@jest/globals"
import { getNumber } from "../src"

describe('extract number in a string', () => {
  const stringTest = 'this is a string with 123 number';

  test('general function, it will transform as a string that only number', () => {
    expect(getNumber(stringTest)).toEqual('123')
  })

  test('force number', () => {
    expect(getNumber(stringTest, true)).toEqual(123)
  })
})