

export type ValueType<V extends string | number, L extends string> = string[] | Record<string, string | number> | Record<V | L, string | number>[]

export type ResValueType = Map<string | number, string | number>

/**
 * 整个数据，将无序的数据整合成映射map
 * @param list 传入的字符串数组或者对象
 */
function handleToValueEnum(list: string[] | Record<string, string | number>): ResValueType;

/**
 * 整个数据，将无序的数据整合成映射map
 * @param list 对象数组
 * @param valueKey value要取的键
 * @param labelKey label要取的键
 */
function handleToValueEnum<V extends string, L extends string>(list: Record<V | L, string | number>[], valueKey?: V, labelKey?: L ): ResValueType;

/**
 * 整个数据，将无序的数据整合成映射map
 * @param list 无序的数据
 * @param valueKey value用的键名
 * @param labelKey label的键名
 * @returns
 */
function handleToValueEnum(
  list: ValueType<string, string>,
  valueKey = 'value',
  labelKey = 'label'
) {
  const resMap: ResValueType = new Map();
  for (let k in list) {
    let ele: string | Record<string, string | number> | number;
    if (Array.isArray(list)) {
      ele = list[+k];
      /** 如果是string[]这样的类型，那就说明k也是要一致 */
      if (typeof ele === 'string') {
        k = ele;
      }
    } else {
      ele = list[k];
    }
    /** 最终使用map的方式整合数据 */
    if (typeof ele === 'string' || typeof ele === 'number') {
      resMap.set(k, ele);
    } else {
      resMap.set(ele[valueKey], ele[labelKey]);
    }
  }
  return resMap;
}

export default handleToValueEnum;

