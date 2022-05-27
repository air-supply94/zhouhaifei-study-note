---
title: concurrent
order: 11
---

## 概述

- 一组新功能,可帮助应用保持响应,并根据用户的设备性能和网速进行适当的调整
- Scheduler: 配合时间切片,根据宿主环境性能,为每个工作单元分配一个可运行时间,实现`异步可中断的更新`
- lane 模型: 控制不同优先级之间的关系与行为
- batchedUpdates: 是以优先级为依据对更新进行合并的,使用范围更广
- Suspense: 组件子树比组件树的其他部分拥有更低的优先级
- useDeferredValue
  - 返回一个延迟响应的值,该值可能延后的最长时间为 timeoutMs
  - 在 useDeferredValue 内部会调用 useState 并触发一次更新
  - 这次更新的优先级很低,所以当前如果有正在进行中的更新,不会受 useDeferredValue 产生的更新影响
  - 当超过 timeoutMs 后 useDeferredValue 产生的更新还没进行,则会再触发一次高优先级更新

## 时间切片

- 本质是模拟实现 requestIdleCallback
- Scheduler 将需要被执行的回调函数作为 MessageChannel 的回调执行(setTimeout 打底)
- 通过 Scheduler 提供的 shouldYield 方法判断是否需要中断遍历
- 在 Scheduler 中,为任务分配的初始剩余时间为 5ms
- 随着应用运行,会通过 fps 动态调整分配给任务的可执行时间

## 优先级调度

### unstable_runWithPriority

```js
function unstable_runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    // 最高优先级
    case ImmediatePriority:
    case UserBlockingPriority:
    case NormalPriority:
    case LowPriority:
    case IdlePriority:
      break;
    default:
      priorityLevel = NormalPriority;
  }

  var previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}
```

### 优先级意义

- unstable_scheduleCallback: 以某个优先级注册回调函数
- 不同优先级意味着不同时长的任务过期时间

```js
var timeout;
switch (priorityLevel) {
  case ImmediatePriority:
    timeout = IMMEDIATE_PRIORITY_TIMEOUT;
    break;
  case UserBlockingPriority:
    timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
    break;
  case IdlePriority:
    timeout = IDLE_PRIORITY_TIMEOUT;
    break;
  case LowPriority:
    timeout = LOW_PRIORITY_TIMEOUT;
    break;
  case NormalPriority:
  default:
    timeout = NORMAL_PRIORITY_TIMEOUT;
    break;
}

var expirationTime = startTime + timeout;

// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
var NORMAL_PRIORITY_TIMEOUT = 5000;
var LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;
```

### 优先级排序

- 数据结构: `小顶堆`
- timerQueue: 保存未就绪任务
- taskQueue: 保存已就绪任务
- 每当有新的未就绪的任务被注册,插入 timerQueue 并根据开始时间重新排列 timerQueue 中任务的顺序
- 当 timerQueue 中有任务就绪(startTime <= currentTime)取出并加入 taskQueue.取出 taskQueue 中最早过期的任务并执行他

```js
const continuationCallback = callback(didUserCallbackTimeout);
currentTime = getCurrentTime();
if (typeof continuationCallback === 'function') {
  // continuationCallback是函数
  currentTask.callback = continuationCallback;
  markTaskYield(currentTask, currentTime);
} else {
  if (enableProfiling) {
    markTaskCompleted(currentTask, currentTime);
    currentTask.isQueued = false;
  }
  if (currentTask === peek(taskQueue)) {
    // 将当前任务清除
    pop(taskQueue);
  }
}
advanceTimers(currentTime);
```

## lane

### 概念

- 使用 31 位的二进制表示 31 条赛道,位数越小的赛道优先级越高,某些相邻的赛道拥有相同优先级
- 越低优先级的更新越容易被打断,导致积压下来,所以需要更多的位
- 最高优的同步更新不需要多余的 lanes

```js
export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000;
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000;

export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001;
export const SyncBatchedLane: Lane = /*                 */ 0b0000000000000000000000000000010;

export const InputDiscreteHydrationLane: Lane = /*      */ 0b0000000000000000000000000000100;
const InputDiscreteLanes: Lanes = /*                    */ 0b0000000000000000000000000011000;

const InputContinuousHydrationLane: Lane = /*           */ 0b0000000000000000000000000100000;
const InputContinuousLanes: Lanes = /*                  */ 0b0000000000000000000000011000000;

export const DefaultHydrationLane: Lane = /*            */ 0b0000000000000000000000100000000;
export const DefaultLanes: Lanes = /*                   */ 0b0000000000000000000111000000000;

const TransitionHydrationLane: Lane = /*                */ 0b0000000000000000001000000000000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111110000000000000;

const RetryLanes: Lanes = /*                            */ 0b0000011110000000000000000000000;

export const SomeRetryLane: Lanes = /*                  */ 0b0000010000000000000000000000000;

export const SelectiveHydrationLane: Lane = /*          */ 0b0000100000000000000000000000000;

const NonIdleLanes = /*                                 */ 0b0000111111111111111111111111111;

export const IdleHydrationLane: Lane = /*               */ 0b0001000000000000000000000000000;
const IdleLanes: Lanes = /*                             */ 0b0110000000000000000000000000000;

export const OffscreenLane: Lane = /*                   */ 0b1000000000000000000000000000000;
```

## 批量(lanes)

```js
const InputDiscreteLanes: Lanes = /*                    */ 0b0000000000000000000000000011000;
export const DefaultLanes: Lanes = /*                   */ 0b0000000000000000000111000000000;
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111110000000000000;
```

### 交集

```js
export function includesSomeLane(a: Lanes | Lane, b: Lanes | Lane) {
  return (a & b) !== NoLanes;
}
```

### 子集

```js
export function isSubsetOfLanes(set: Lanes, subset: Lanes | Lane) {
  return (set & subset) === subset;
}
```

### 合并

```js
export function mergeLanes(a: Lanes | Lane, b: Lanes | Lane): Lanes {
  return a | b;
}
```

### 移除

```js
export function removeLanes(set: Lanes, subset: Lanes | Lane): Lanes {
  return set & ~subset;
}
```
