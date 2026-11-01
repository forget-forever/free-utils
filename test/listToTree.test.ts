import { describe, test, expect } from "@jest/globals";
import { listToTree } from "../src";

describe('扁平列表转树', () => {
  const list = [
    { id: 1, parentId: null, name: 'root' },
    { id: 2, parentId: 1, name: 'child-1' },
    { id: 3, parentId: 1, name: 'child-2' },
    { id: 4, parentId: 2, name: 'grandchild' },
  ];

  test('默认使用 id、parentId 和 children', () => {
    const tree = listToTree(list);
    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe(1);
    expect(tree[0].children).toHaveLength(2);
    expect(tree[0].children[0].children[0].name).toBe('grandchild');
  });

  test('支持自定义键名和根节点值', () => {
    const customList = [
      { key: 'a', pid: 'root', title: 'A' },
      { key: 'b', pid: 'a', title: 'B' },
    ];
    const tree = listToTree(customList, {
      idKey: 'key',
      parentKey: 'pid',
      childrenKey: 'items',
      rootValue: 'root',
    });
    expect(tree).toHaveLength(1);
    expect(tree[0].items).toHaveLength(1);
    expect(tree[0].items[0].title).toBe('B');
  });

  test('支持数字 0 作为根节点值', () => {
    const tree = listToTree(
      [
        { id: 1, parentId: 0 },
        { id: 2, parentId: 1 },
      ],
      { rootValue: 0 },
    );
    expect(tree).toHaveLength(1);
    expect(tree[0].children[0].id).toBe(2);
  });

  test('找不到父节点的数据当作根节点', () => {
    const tree = listToTree([
      { id: 1, parentId: null },
      { id: 2, parentId: 99 },
    ]);
    expect(tree).toHaveLength(2);
  });

  test('不修改原始数据', () => {
    const source = [{ id: 1, parentId: null }];
    listToTree(source);
    expect('children' in source[0]).toBe(false);
  });
});
