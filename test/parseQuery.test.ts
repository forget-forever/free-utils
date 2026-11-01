import { describe, test, expect } from "@jest/globals";
import { parseQuery } from "../src";

describe('解析 URL query 参数', () => {
  test('解析完整 URL', () => {
    expect(parseQuery('https://example.com/path?a=1&b=2')).toEqual({ a: '1', b: '2' });
  });

  test('解析带问号的参数串', () => {
    expect(parseQuery('?a=1&b=2')).toEqual({ a: '1', b: '2' });
  });

  test('解析不带问号的参数串', () => {
    expect(parseQuery('a=1&b=2')).toEqual({ a: '1', b: '2' });
  });

  test('解码特殊字符', () => {
    expect(parseQuery('a=%E4%B8%AD%E6%96%87&b=hello+world')).toEqual({
      a: '中文',
      b: 'hello world',
    });
  });

  test('重复的 key 返回数组', () => {
    expect(parseQuery('a=1&a=2&a=3')).toEqual({ a: ['1', '2', '3'] });
  });

  test('忽略 hash 和空参数', () => {
    expect(parseQuery('a=1&&b=2#hash')).toEqual({ a: '1', b: '2' });
  });

  test('空字符串返回空对象', () => {
    expect(parseQuery()).toEqual({});
  });
});
