let preReject: null | (() => void) = null;


// const isFilesList = <T extends {name: string}>(item: T | never): item is T => {
//   return typeof item === 'object' && !!item.name;
// };

// const filterInvalidItem = <T extends FileList>(list: T | never[]): list is T => {
//   return list instanceof FileList;
// };

/**
 * js主动选择文件的函数，内部有对垃圾回收做的优化
 */
const selectFiles = (options?: {
  /**
   * 允许选择的文件
   * @default '.xls,.xlsx'
  */
  accept?: string;
  /**
   * 允许的最大的文件数量
   * @default 1
  */
  maxFiles?: number;
  /**
   * 文件的大小限制, 单位mb
   * @default 50
  */
  sizeLimit?: number;
  /** 失败的时候处理的 */
  err?: ((e: Error) => void);
}
) => {
  const {sizeLimit = 50, maxFiles = 1,  accept = '.xls,.xlsx', err = () => {}} = options || {};
  if (preReject) {
    preReject();
  }
  return new Promise<FileList>((resolveSource, rejectSource) => {
    
    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', 'multiple');
    input.accept = accept;

    preReject = rejectSource;

    const resolve: typeof resolveSource = (...args) => {
      /** 这时候可以把之前的改成null */
      preReject = null
      return resolveSource(...args)
    }

    const reject: typeof rejectSource = (...args) => {
      /** 这时候可以把之前的改成null */
      preReject = null
      return rejectSource(...args)
    }

    
    const changeHandle = (e: Event) => {
      let resSig = true;
      const {files: filesSource = []} = (e.target || {}) as HTMLInputElement;

      const files = filesSource || [];

      const returnErr = (msg: string) => {
        resSig = false;
        err(Error(msg));
        reject(Error(msg));
      };
      if (files.length > maxFiles) {
        returnErr(`文件过多，限制${maxFiles}个`);
      }
      for (let index = 0; index < files.length; index++) {
        const { size } = files[index];
        if (size / 1024 / 1024 > sizeLimit) {
          returnErr(`文件过大，限制${sizeLimit}mb`);
          break;
        }
      }
      
      
      if (resSig ) {
        resolve(files as FileList);
      }
    };

    input.addEventListener('change', changeHandle, false);
    input.click();
  });
};

export default selectFiles;