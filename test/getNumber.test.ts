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

describe('the edge cases of the getNumber', () => {
  test('returns a number as it is', () => {
    expect(getNumber(12)).toEqual(12)
  })

  test('keeps the number as a string when mustNum is false', () => {
    expect(getNumber('a1b2', false)).toEqual('12')
  })

  test('returns an empty string when there is no number', () => {
    expect(getNumber('none')).toEqual('')
    expect(getNumber('none', true)).toEqual(0)
  })
})
