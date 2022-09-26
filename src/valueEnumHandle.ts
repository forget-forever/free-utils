/**
 * 将键值对，字符串数组转换成label，value这样的options数组
 * @param valueEnum 
 * @returns 
 */
const valueEnumHandle = (valueEnum: string[] | Record<string, string> | Record<'label' | 'value', string>[]) => {
  let options: Record<'label' | 'value', string>[] = [];
  /** 不是数组，是Record<string, string> 形式的 */
  if (valueEnum && !Array.isArray(valueEnum)) {
    Object.entries(valueEnum).forEach(([value, label]) => {
      if (['全部', '全选', '不限'].includes(label)) {
        options.unshift({ value, label });
      } else {
        options.push({ value, label });
      }
    });
  }
  if (valueEnum && Array.isArray(valueEnum)) {
    options = valueEnum.map((ele) => {
      if (typeof ele === 'object') {
        return ele;
      }
      return {
        value: ele,
        label: ele,
      };
    });
  }
  return options;
};

export default valueEnumHandle;