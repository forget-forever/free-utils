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

describe('generate option object with the default label', () => {
  test('use the value as the label when the label is undefined', () => {
    expect(generateOption(1)).toEqual({ value: 1, label: 1 })
  })

  test('only custom the label key', () => {
    expect(generateOption(1, 'one', { labelKey: 'text' })).toEqual({ value: 1, text: 'one' })
  })
})
