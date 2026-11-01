import { describe, test, expect } from "@jest/globals";
import { stringifyQuery, parseQuery } from "../src";

describe('对象序列化为 query 字符串', () => {
  test('基础对象', () => {
    expect(stringifyQuery({ a: 1, b: '2' })).toBe('a=1&b=2');
  });

  test('编码特殊字符', () => {
    expect(stringifyQuery({ a: '中 文' })).toBe('a=%E4%B8%AD%20%E6%96%87');
  });

  test('忽略 null 和 undefined', () => {
    expect(stringifyQuery({ a: 1, b: null, c: undefined, d: 2 })).toBe('a=1&d=2');
  });

  test('数组展开成重复的 key', () => {
    expect(stringifyQuery({ a: [1, 2] })).toBe('a=1&a=2');
  });

  test('空对象返回空字符串', () => {
    expect(stringifyQuery()).toBe('');
  });

  test('可以和 parseQuery 互相转换', () => {
    const params = { a: '1', b: 'hello world' };
    expect(parseQuery(stringifyQuery(params))).toEqual(params);
  });
});
