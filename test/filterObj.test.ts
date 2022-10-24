import { describe, test, expect } from "@jest/globals"
import { filterObj } from "../src"

describe('filter some invalid key in an object', () => {
  const obj = {
    a: 123,
    b: 456,
    c: 0
  }

  test('general function, it will filter some key', () => {
    expect(filterObj(obj, (v, k) => {
      return !!v
    })).toEqual({
      a: 123,
      b: 456,
    })
  })


})