// const { expect, describe, test } = require("@jest/globals")
// const { optionsHandle } = require('../src/index')

import { describe, test, expect } from "@jest/globals";
import { optionsHandle } from "../src";

describe('处理options 的对象，转成映射表', () => {
  const test1 = ['key1', 'key2'];
  const test2 = {key1: 1, key2: 2};
  const test3 = [
    { key1: 1, key2: 2},
    { key1: 3, key2: 4 }
  ];
  const test4 = [
    {value: 1, label: 2},
    { value: 3, label: 4 }
  ];

  const res = new Map([
    [1, 2],
    [3, 4],
  ]);

  test('字符串型的数据', () => {
    expect(optionsHandle(test1)).toEqual(new Map([
      ['key1', 'key1'],
      ['key2', 'key2'],
    ]))
  });

  test('对象型数据', () => {
    expect(optionsHandle(test2)).toEqual(new Map([
      ['key1', 1],
      ['key2', 2],
    ]))
  })

  test('对象型数据1', () => {
    expect(optionsHandle(test3, 'key1', 'key2')).toEqual(res)
  })
  test('对象型数据2', () => {
    expect(optionsHandle(test4)).toEqual(res)
  })

});
