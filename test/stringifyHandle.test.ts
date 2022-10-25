import { describe, test, expect } from "@jest/globals"
import { stringifyHandle } from "../src"

describe('stringify any value', () => {
  const obj = {
    a: 123,
    b: 456,
    c: 0
  }

  const arr = ['a', 1]

  test('it will stringify when input an obj', () => {
    expect(stringifyHandle(obj)).toEqual(JSON.stringify(obj))
  })

  test('it will output what input when you input a string', () => {
    expect(stringifyHandle('1234')).toEqual('1234')
  })

})