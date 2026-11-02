import { describe, test, expect } from "@jest/globals"
import { namePathHandle, namepathAdd } from "../src"

describe('handle the namepath of the form', () => {
  test('empty value returns an empty array', () => {
    expect(namePathHandle()).toEqual([])
    expect(namePathHandle(undefined)).toEqual([])
    expect(namePathHandle(null as any)).toEqual([])
  })

  test('zero is a valid namepath', () => {
    expect(namePathHandle(0)).toEqual([0])
  })

  test('string and number are wrapped into an array', () => {
    expect(namePathHandle('name')).toEqual(['name'])
    expect(namePathHandle(2)).toEqual([2])
  })

  test('array returns itself', () => {
    const path = ['a', 1, 'b']
    expect(namePathHandle(path)).toBe(path)
  })

  test('namepathAdd concats every namepath', () => {
    expect(namepathAdd('a', ['b', 2], 3)).toEqual(['a', 'b', 2, 3])
  })

  test('namepathAdd keeps the empty namepath out', () => {
    expect(namepathAdd(undefined as any, 'a', [], 0)).toEqual(['a', 0])
    expect(namepathAdd()).toEqual([])
  })
})
