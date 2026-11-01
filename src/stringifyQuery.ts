/**
 * 将对象序列化为 query 字符串（不带问号）
 * @param params 参数对象，值为 null 或 undefined 时会被忽略，数组会展开成重复的 key
 * @returns 序列化后的字符串
 */
const stringifyQuery = (params: Record<string, unknown> = {}): string => {
  const result: string[] = [];
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value === null || value === undefined) {
      return;
    }
    const values = Array.isArray(value) ? value : [value];
    values.forEach((item) => {
      if (item === null || item === undefined) {
        return;
      }
      result.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(item))}`);
    });
  });
  return result.join('&');
};

export default stringifyQuery;
