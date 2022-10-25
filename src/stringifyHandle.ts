/**
 * 序列化数据，如果是对象就序列化数据
 */
export default <T extends unknown>(text: T, replacer?: (number | string)[] | null, space?: string | number ): string | number => {
  if (text && typeof text === 'object') {
    return JSON.stringify(text, replacer, space)
  }
  return text as string
}