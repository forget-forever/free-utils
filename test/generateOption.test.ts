import { describe, test, expect } from "@jest/globals"
import { generateOption } from "../src"

describe('generate option object', () => {

  test('general use', () => {
    // const val2 = generateOption(1, 'one')
    expect(generateOption(1, 'one')).toEqual({
      value: 1,
      label: "one"
  })
  })

  test('general ', () => {
    // const val2 = generateOption(1, 'one', {valueKey: 'value1', labelKey: 'label1'})
    expect(generateOption(1, 'one', {valueKey: 'value1', labelKey: 'label1'})).toEqual({
      value1: 1,
      label1: "one"
  })
  })


})