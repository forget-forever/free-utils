/**
 * 生成option对象的函数
 * @param value 
 * @param label 
 */
export function generateOption<V extends string | number, L extends string | number,>(
  value: V,
  label?: L,): {value: V, label: L}

/**
 * 生成option对象的函数， 可以指定labelKey, valueKey
 * @param value 
 * @param label 
 * @param config 
 */
export function generateOption<
  V extends string | number,
  L extends string | number,
  LK extends string = 'label',
  VK extends string = 'value'
>(
  value: V,
  label?: L,
  config?: { labelKey?: LK, valueKey?: VK,  }
): {
  [k in VK]: V
} & {
  [k in LK]: L
}

/**
 * 生成option对象的函数
 * @param value value的值
 * @param label label的值
 * @param config 一些配置方法
 * @returns 处理好的值，如果label是undefined，那么label会使用value
 */
export function generateOption<
  V extends string | number,
  L extends string | number,
  LK extends string = 'label',
  VK extends string = 'value'
>(
  value: V,
  label?: L,
  config?: { labelKey?: LK, valueKey?: VK,  }
){
  const { labelKey = 'label' as 'label', valueKey = 'value' as 'value' } = config || {}

  if (label === undefined) {
    return { [labelKey]: value, [valueKey]: value }
  }
  return { [labelKey]: label, [valueKey]: value }
}

export default generateOption