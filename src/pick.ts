import { pick } from "lodash"

/**
 * 提取对象中的数据
 */
export default <T extends object, K extends (keyof T)[]>(obj: T, ...keys: K): Pick<T, K[number]> => {
  return pick(obj, ...keys)
}