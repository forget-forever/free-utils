const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

/**
 * 将字节数格式化成可读的文件大小
 * @param bytes 字节数
 * @param decimals 保留的小数位数，默认 2
 * @returns 格式化后的字符串，例如 1536 会返回 '1.5 KB'
 */
const formatFileSize = (bytes: number, decimals = 2): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return '0 B';
  }
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), UNITS.length - 1);
  if (index === 0) {
    return `${Math.round(bytes)} B`;
  }
  const size = Number((bytes / Math.pow(1024, index)).toFixed(decimals));
  return `${size} ${UNITS[index]}`;
};

export default formatFileSize;
