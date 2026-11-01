import { describe, test, expect, jest, afterEach } from "@jest/globals";
import { formatDate } from "../src";

describe('日期格式化', () => {
  const date = new Date(2022, 8, 5, 3, 4, 5);

  test('使用默认格式', () => {
    expect(formatDate(date)).toBe('2022-09-05 03:04:05');
  });

  test('使用自定义格式', () => {
    expect(formatDate(date, 'YYYY/MM/DD')).toBe('2022/09/05');
    expect(formatDate(date, 'HH:mm:ss')).toBe('03:04:05');
    expect(formatDate(date, 'YYYY年MM月DD日')).toBe('2022年09月05日');
  });

  test('支持时间戳和日期字符串', () => {
    expect(formatDate(date.getTime(), 'YYYY-MM-DD')).toBe('2022-09-05');
    expect(formatDate('2022-09-05 03:04:05', 'YYYY-MM-DD')).toBe('2022-09-05');
  });

  test('非法日期返回空字符串', () => {
    expect(formatDate('not a date')).toBe('');
  });

  test('默认使用当前时间', () => {
    expect(formatDate()).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });
});
