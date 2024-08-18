/**
 * 将键值对，字符串数组转换成label，value这样的options数组
 * @param valueEnum 
 * @returns 
 */
const valueEnumHandle = <B extends boolean = false>(
  valueEnum: string[] | Record<string, string | number> | Record<'label' | 'value', string>[],
  config?: {
    /** value转成数字 */
    valueToNumber?: B
  }
): {
  value: B extends true ? number : string | number;
  label: string;
}[] => {
  let options: Record<'label' | 'value', string | number>[] = [];
  const { valueToNumber } = config || {};
  /** 不是数组，是Record<string, string> 形式的 */
  if (valueEnum && !Array.isArray(valueEnum)) {
    Object.entries(valueEnum).forEach(([value, label]) => {
      let resVal: string | number = value;
      if (valueToNumber) {
        resVal = Number(value);
      }
      if (['全部', '全选', '不限', 'All', 'all', 0].includes(label)) {
        options.unshift({ value: resVal, label });
      } else {
        options.push({ value: resVal, label });
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
  return options as any;
};

export default valueEnumHandle;