import { describe, test, expect } from "@jest/globals"
import { pick } from "../src"

describe('extract number in a string', () => {
  const obj = {
    a: 1,
    b: 2,
    c: {k1: 1, k2: 2}
  }
  test('pick some keys', () => {
    expect(pick(obj, 'a')).toEqual({a: 1})
  })


  test('keys', () => {
    expect(pick(obj, 'b', 'c')).toEqual({b: 2, c: {k1: 1, k2: 2}})
  })
})