/**
 * 去除一个类型包含的void属性
 */
 export type OmitVoid<T> = T | undefined extends infer R1 | undefined
 ? R1
 : T | null extends infer R2 | null
 ? R2
 : T;

/**
* 自己定义的Omit类型
*/
export type MyOmit<T, K extends keyof T> = Omit<T, K>;

/** 提取类型 */
export type ValueOf<T> = T extends { [K in keyof T]: infer V } ? V : never;

