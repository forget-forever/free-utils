/**
 * 日期格式化
 * @param date 日期，支持 Date、时间戳、日期字符串，默认当前时间
 * @param format 格式化模板，支持 YYYY MM DD HH mm ss，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的字符串，日期非法时返回空字符串
 */
const formatDate = (
  date: Date | string | number = new Date(),
  format = 'YYYY-MM-DD HH:mm:ss',
): string => {
  const target = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(target.getTime())) {
    return '';
  }
  const pad = (num: number) => String(num).padStart(2, '0');
  const map: Record<string, string> = {
    YYYY: String(target.getFullYear()),
    MM: pad(target.getMonth() + 1),
    DD: pad(target.getDate()),
    HH: pad(target.getHours()),
    mm: pad(target.getMinutes()),
    ss: pad(target.getSeconds()),
  };
  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (key) => map[key]);
};

export default formatDate;
