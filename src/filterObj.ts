
/**
 * 过滤对象的函数，过滤之后所有的键值都会被赋予可选属性
 */
const filterObj = <T extends Record<string, unknown>>(obj: T, cb: (v: T[keyof T], k: keyof T) => boolean) => {
  const res: Partial<T> = {}
  Object.keys(obj).forEach((k: keyof T) => {
    const dest = cb(obj[k], k)
    if (dest) {
      res[k] = obj[k]
    }
  })

  return res
}

export default filterObj