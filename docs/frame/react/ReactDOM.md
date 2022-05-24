---
title: ReactDOM.render
order: 8
---

## 创建 fiber

- legacyCreateRootFromDOMContainer

```js
root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
fiberRoot = root._internalRoot;
```

- createFiberRoot

```js
export function createFiberRoot(containerInfo: any, tag: RootTag, hydrate: boolean, hydrationCallbacks: null | SuspenseHydrationCallbacks): FiberRoot {
  // 创建fiberRootNode
  const root: FiberRoot = (new FiberRootNode(containerInfo, tag, hydrate): any);

  // 创建rootFiber
  const uninitializedFiber = createHostRootFiber(tag);

  // 连接rootFiber与fiberRootNode
  root.current = uninitializedFiber;
  uninitializedFiber.stateNode = root;

  // 初始化updateQueue
  initializeUpdateQueue(uninitializedFiber);

  return root;
}
```

## 创建 update

```js
export function updateContainer(element: ReactNodeList, container: OpaqueRoot, parentComponent: ?React$Component<any, any>, callback: ?Function): Lane {
  // ...省略与逻辑不相关代码

  // 创建update
  const update = createUpdate(eventTime, lane, suspenseConfig);

  // update.payload为需要挂载在根节点的组件
  update.payload = { element };

  // callback为ReactDOM.render的第三个参数 —— 回调函数
  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }

  // 将生成的update加入updateQueue
  enqueueUpdate(current, update);
  // 调度更新
  scheduleUpdateOnFiber(current, lane, eventTime);

  // ...省略与逻辑不相关代码
}
```

## 其他入口

### legacy

- `ReactDOM.render(<App />, rootNode)`
- 模式在合成事件中有自动批处理的功能,但仅限于一个浏览器任务

### blocking

- `ReactDOM.createBlockingRoot(rootNode).render(<App />)`
- setState 在默认情况下都是批处理的

### concurrent

- `ReactDOM.createRoot(rootNode).render(<App />)`
- setState 在默认情况下都是批处理的
