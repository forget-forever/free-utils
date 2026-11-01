/**
 * 解析 URL 中的 query 参数
 * @param url 完整 URL、带问号的参数串或者不带问号的参数串
 * @returns 解析后的参数对象，同一个 key 出现多次时值为数组
 */
const parseQuery = (url = ''): Record<string, string | string[]> => {
  const questionIndex = url.indexOf('?');
  const query = questionIndex > -1 ? url.slice(questionIndex + 1) : url;
  const hashIndex = query.indexOf('#');
  const search = hashIndex > -1 ? query.slice(0, hashIndex) : query;
  const result: Record<string, string | string[]> = {};

  const decode = (text: string) => {
    const withSpace = text.replace(/\+/g, ' ');
    try {
      return decodeURIComponent(withSpace);
    } catch (e) {
      return withSpace;
    }
  };

  search.split('&').forEach((part) => {
    if (!part) {
      return;
    }
    const equalIndex = part.indexOf('=');
    const key = decode(equalIndex > -1 ? part.slice(0, equalIndex) : part);
    const value = decode(equalIndex > -1 ? part.slice(equalIndex + 1) : '');
    const current = result[key];
    if (current === undefined) {
      result[key] = value;
    } else if (Array.isArray(current)) {
      current.push(value);
    } else {
      result[key] = [current, value];
    }
  });

  return result;
};

export default parseQuery;
