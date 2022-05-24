---
title: this.setState
order: 9
---

## setState

```js
Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
    throw Error('setState(...): takes an object of state variables to update or a function which returns an object of state variables.');
  }
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
```

## enqueueSetState

```js
function enqueueSetState(inst, payload, callback) {
  // 通过组件实例获取对应fiber
  const fiber = getInstance(inst);

  const eventTime = requestEventTime();
  const suspenseConfig = requestCurrentSuspenseConfig();

  // 获取优先级
  const lane = requestUpdateLane(fiber, suspenseConfig);

  // 创建update
  const update = createUpdate(eventTime, lane, suspenseConfig);

  update.payload = payload;

  // 赋值回调函数
  if (callback !== undefined && callback !== null) {
    update.callback = callback;
  }

  // 将update插入updateQueue
  enqueueUpdate(fiber, update);
  // 调度update
  scheduleUpdateOnFiber(fiber, lane, eventTime);
}
```

- update.payload 为 this.setState 的第一个传参

## forceUpdate

```js
function enqueueForceUpdate(inst, callback) {
  const fiber = getInstance(inst);
  const eventTime = requestEventTime();
  const suspenseConfig = requestCurrentSuspenseConfig();
  const lane = requestUpdateLane(fiber, suspenseConfig);

  const update = createUpdate(eventTime, lane, suspenseConfig);

  // 赋值tag为ForceUpdate
  update.tag = ForceUpdate;

  if (callback !== undefined && callback !== null) {
    update.callback = callback;
  }

  enqueueUpdate(fiber, update);
  scheduleUpdateOnFiber(fiber, lane, eventTime);
}
```

## 判断更新

```js
const shouldUpdate = checkHasForceUpdateAfterProcessing() || checkShouldComponentUpdate(workInProgress, ctor, oldProps, newProps, oldState, newState, nextContext);
```

- checkHasForceUpdateAfterProcessing:内部会判断本次更新的 Update 是否为 ForceUpdate.即如果本次更新的 Update 中存在 tag 为 ForceUpdate,则返回 true
- checkShouldComponentUpdate: 内部会调用 shouldComponentUpdate 方法
