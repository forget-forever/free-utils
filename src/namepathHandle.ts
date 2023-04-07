type NamePath = string | number | (string | number)[]  

/**
 * 将namepath处理成数组
 * @param name 
 * @returns 
 */
export const namePathHandle = (name?: NamePath) => {
  if (!name && name !== 0) {
    return [];
  }
  if (Array.isArray(name)) {
    return name;
  }
  return [name];
};

/**
 * namepath的拼接
*/
export const namepathAdd = (...args: NamePath[]) => {
  const resPath: ReturnType<typeof namePathHandle> = []
  args.forEach((ele) => {
    resPath.push(...namePathHandle(ele))
  })
  return resPath
}
