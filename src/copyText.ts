/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns 复制完成的 Promise，失败时 reject
 */
const copyText = async (text: string): Promise<void> => {
  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch (e) {
      /** 剪贴板权限不可用（比如非 https 环境）时降级到 execCommand */
    }
  }

  if (typeof document === 'undefined') {
    throw new Error('当前环境不支持复制到剪贴板');
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.top = '0';
  textarea.style.left = '0';
  textarea.style.opacity = '0';
  textarea.setAttribute('readonly', 'readonly');
  document.body.appendChild(textarea);
  textarea.select();

  let success = false;
  try {
    success = document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
  if (!success) {
    throw new Error('复制失败');
  }
};

export default copyText;
