/**
 * 文件下载的方法，支持跨域下载，自定义文件名下载
 * @param urls 文件的链接，支持跨域
 * @param fileName 文件名, 可以自定义
 * @param success 开始下载之后的回调
 */
const download = (urls: string, fileName?: string, success?: () => void) => {
  const x = new window.XMLHttpRequest();
  x.open('GET', urls, true);
  x.responseType = 'blob';
  x.onload = () => {
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank'
    if (fileName) {
      a.download = fileName;
    }
    a.style.display = 'none'
    // document.body.append(a)
    a.click();
    success && success()
  };
  x.send();
}

export default download;