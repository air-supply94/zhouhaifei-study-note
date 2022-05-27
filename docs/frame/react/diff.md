---
title: diff算法
order: 6
---

## 瓶颈

传统将前后两棵树完全比对的算法的复杂程度为 O(n ^ 3 )

## 预设

- 只对同级元素进行 Diff.如果一个 DOM 节点在前后两次更新中跨越了层级,那么 React 不会尝试复用他
- 两个不同类型的元素会产生出不同的树.如果元素由 div 变为 p,React 会销毁 div 及其子孙节点,并新建 p 及其子孙节点
- 开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定

## 实现

```js
// 根据newChild类型选择不同diff函数处理
function reconcileChildFibers(returnFiber: Fiber, currentFirstChild: Fiber | null, newChild: any): Fiber | null {
  const isObject = typeof newChild === 'object' && newChild !== null;

  if (isObject) {
    // object类型,可能是 REACT_ELEMENT_TYPE 或 REACT_PORTAL_TYPE
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
      // 调用 reconcileSingleElement 处理
      // // ...省略其他case
    }
  }

  if (typeof newChild === 'string' || typeof newChild === 'number') {
    // 调用 reconcileSingleTextNode 处理
    // ...省略
  }

  if (isArray(newChild)) {
    // 调用 reconcileChildrenArray 处理
    // ...省略
  }

  // 一些其他情况调用处理函数
  // ...省略

  // 以上都没有命中,删除节点
  return deleteRemainingChildren(returnFiber, currentFirstChild);
}
```

- 当 newChild 类型为 object、number、string,代表同级只有一个节点
- 当 newChild 类型为 Array,同级有多个节点

## 单节点

```js
function reconcileSingleElement(returnFiber: Fiber, currentFirstChild: Fiber | null, element: ReactElement): Fiber {
  const key = element.key;
  let child = currentFirstChild;

  // 首先判断是否存在对应DOM节点
  while (child !== null) {
    // 上一次更新存在DOM节点,接下来判断是否可复用

    // 首先比较key是否相同
    if (child.key === key) {
      // key相同,接下来比较type是否相同

      switch (child.tag) {
        // ...省略case

        default: {
          if (child.elementType === element.type) {
            // type相同则表示可以复用
            // 返回复用的fiber
            return existing;
          }

          // type不同则跳出switch
          break;
        }
      }
      // 代码执行到这里代表：key相同但是type不同
      // 将该fiber及其兄弟fiber标记为删除
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      // key不同,将该fiber标记为删除
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }

  // 创建新Fiber,并返回 ...省略
}
```

- 当 child !== null 且 key 相同且 type 不同时执行 deleteRemainingChildren 将 child 及其兄弟 fiber 都标记删除
- 当 child !== null 且 key 不同时仅将 child 标记删除

## 多节点

### 处理情况

- 节点更新: 执行更新逻辑
- 节点新增或减少: 执行新增、删除逻辑
- 节点位置变化

### 整体逻辑

- 第一轮遍历: 处理更新的节点
- 第二轮遍历: 处理剩下的不属于更新的节点

### 第一轮

- 遍历 newChildren,将 newChildren 与 oldFiber 比较,判断 DOM 节点是否可复用
- 如果可复用,继续比较 newChildren 与 oldFiber.sibling,可以复用则继续遍历
- 如果不可复用
  - key 不同导致不可复用,立即跳出整个遍历,第一轮遍历结束
  - key 相同 type 不同导致不可复用,会将 oldFiber 标记为 DELETION,并继续遍历
- 如果 newChildren 遍历完或者 oldFiber 遍历完跳出遍历,第一轮遍历结束

### 第一轮结果

- newChildren 和 oldFiber 都没有遍历完
- newChildren 和 oldFiber 至少有一个遍历完

## 第二轮

- newChildren 与 oldFiber 同时遍历完: Diff 结束
- newChildren 没遍历完,oldFiber 遍历完: 本次更新有新节点插入,遍历剩下的 newChildren 为生成的 workInProgress fiber 依次标记 Placement
- newChildren 遍历完, oldFiber 没遍历完: 本次更新比之前的节点数量少,有节点被删除了.遍历剩下的 oldFiber,依次标记 Deletion
- newChildren 与 oldFiber 都没遍历完: 有节点在这次更新中改变了位置

### 移动节点

- 将未处理的 oldFiber 存入以 key 为 key,oldFiber 为 value 的 Map 中

```js
const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
```

- 遍历剩余 newChildren,通过 newChildren.key 就能在 existingChildren 中找到 key 相同的 oldFiber

### 标记节点是否移动

- lastPlacedIndex: 上一个可复用的节点在 oldFiber 中的位置索引(初始 0)
- oldIndex: 当前可复用节点在 oldFiber 中的位置索引
- 如果 oldIndex < lastPlacedIndex,代表本次更新该节点需要向右移动
- 如果 oldIndex >= lastPlacedIndex,则 lastPlacedIndex = oldIndex
