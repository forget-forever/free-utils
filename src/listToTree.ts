export type TreeNode<T, C extends string = 'children'> = T & {
  [K in C]: TreeNode<T, C>[];
};

export interface ListToTreeConfig<T, C extends string = 'children'> {
  /** 唯一标识的键名 @default 'id' */
  idKey?: keyof T & string;
  /** 父级标识的键名 @default 'parentId' */
  parentKey?: keyof T & string;
  /** 子节点存放的键名 @default 'children' */
  childrenKey?: C;
  /** 根节点的父级值，默认父级为 null 或 undefined 时视为根节点 */
  rootValue?: unknown;
}

/**
 * 将扁平列表转换成树形结构
 * @param list 扁平列表
 * @param config 转换配置
 * @returns 树形数组，找不到父节点的数据会被当作根节点
 */
const listToTree = <T extends Record<string, any>, C extends string = 'children'>(
  list: T[],
  config: ListToTreeConfig<T, C> = {},
): TreeNode<T, C>[] => {
  const {
    idKey = 'id' as keyof T & string,
    parentKey = 'parentId' as keyof T & string,
    childrenKey = 'children' as C,
    rootValue,
  } = config;

  const nodeMap = new Map<unknown, TreeNode<T, C>>();
  const result: TreeNode<T, C>[] = [];

  list.forEach((item) => {
    const node = { ...item } as unknown as TreeNode<T, C>;
    node[childrenKey] = [] as unknown as TreeNode<T, C>[C];
    nodeMap.set(item[idKey], node);
  });

  list.forEach((item) => {
    const node = nodeMap.get(item[idKey]) as TreeNode<T, C>;
    const parentId = item[parentKey];
    const parent = nodeMap.get(parentId);
    const isRoot =
      parent === undefined ||
      parent === node ||
      parentId === rootValue ||
      parentId === null ||
      parentId === undefined;
    if (isRoot) {
      result.push(node);
    } else {
      parent[childrenKey].push(node);
    }
  });

  return result;
};

export default listToTree;
