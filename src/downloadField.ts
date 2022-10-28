const download = (urls: string, fileName: string) => {
  const x = new window.XMLHttpRequest();
  x.open('GET', urls, true);
  x.responseType = 'blob';
  x.onload = () => {
    const url = window.URL.createObjectURL(x.response);
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank'
    a.download = fileName;
    a.style.display = 'none'
    document.body.append(a)
    a.click();
  };
  x.send();
}

export default download;