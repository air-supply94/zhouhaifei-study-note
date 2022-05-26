---
title: hooks
order: 10
---

## dispatcher

### mount

```js
const HooksDispatcherOnMount: Dispatcher = {
  useCallback: mountCallback,
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: mountImperativeHandle,
  useLayoutEffect: mountLayoutEffect,
  useMemo: mountMemo,
  useReducer: mountReducer,
  useRef: mountRef,
  useState: mountState,
};
```

### update

```js
const HooksDispatcherOnUpdate: Dispatcher = {
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: updateState,
};
```

### ReactCurrentDispatcher

```js
ReactCurrentDispatcher.current = current === null || current.memoizedState === null ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
```

### hooks 数据结构

```js
const hook: Hook = {
  memoizedState: null,

  baseState: null,
  baseQueue: null,
  queue: null,

  next: null,
};
```

### memoizedState

fiber.memoizedState: FunctionComponent 对应 fiber 保存的 Hooks 链表而 hook.memoizedState: Hooks 链表中保存的单一 hook 对应的数据

- useState(initState): memoizedState 保存 state 的值
- useReducer(reducer, initState): memoizedState 保存 state 的值
- useEffect: memoizedState 保存包含 useEffect 回调函数、依赖项等的链表数据结构 effect
- useRef: 对于 useRef(1),memoizedState 保存{current: 1}
- useMemo(callback, depth): memoizedState 保存\[callback(),和 depth]
- useCallback(callback, depth): memoizedState 保存\[callback,和 depth]

## useState 和 useReducer

### mount

```js
function mountState<S>(initialState: (() => S) | S) {
  // 创建并返回当前的hook
  const hook = mountWorkInProgressHook();

  // ...赋值初始state

  // 创建queue
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  });

  // ...创建dispatch
  return [hook.memoizedState, dispatch];
}

function mountReducer<S, I, A>(reducer: (S, A) => S, initialArg: I, init: (I) => S) {
  // 创建并返回当前的hook
  const hook = mountWorkInProgressHook();

  // ...赋值初始state

  // 创建queue
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: reducer,
    lastRenderedState: (initialState: any),
  });

  // ...创建dispatch
  return [hook.memoizedState, dispatch];
}
```

- `queue`

```js
const queue = (hook.queue = {
  // 保存update对象
  pending: null,
  // 保存dispatchAction.bind()的值
  dispatch: null,
  // 上一次render时使用的reducer
  lastRenderedReducer: reducer,
  // 上一次render时的state
  lastRenderedState: (initialState: any),
});
```

- `basicStateReducer`

```js
function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  return typeof action === 'function' ? action(state) : action;
}
```

### update

```js
function updateReducer<S, I, A>(reducer: (S, A) => S, initialArg: I, init: (I) => S) {
  // 获取当前hook
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;

  queue.lastRenderedReducer = reducer;

  // ...同update与updateQueue类似的更新逻辑

  const dispatch: Dispatch<A> = (queue.dispatch: any);
  return [hook.memoizedState, dispatch];
}
```

- didScheduleRenderPhaseUpdate: 是否是 render 阶段触发的更新

### 调用

```js
function dispatchAction(fiber, queue, action) {
  // ...创建update
  var update = {
    eventTime: eventTime,
    lane: lane,
    suspenseConfig: suspenseConfig,
    action: action,
    eagerReducer: null,
    eagerState: null,
    next: null,
  };

  // ...将update加入queue.pending

  var alternate = fiber.alternate;

  if (fiber === currentlyRenderingFiber$1 || (alternate !== null && alternate === currentlyRenderingFiber$1)) {
    // render阶段触发的更新
    didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  } else {
    if (fiber.lanes === NoLanes && (alternate === null || alternate.lanes === NoLanes)) {
      // ...fiber的updateQueue为空,优化路径
    }

    scheduleUpdateOnFiber(fiber, lane, eventTime);
  }
}
```

- fiber 以及 hook.queue 已经通过调用 bind 方法预先作为参数传入

## useEffect

### 异步调度

- before mutation 阶段在 scheduleCallback 中调度 flushPassiveEffects
- layout 阶段之后将 effectList 赋值给 rootWithPendingPassiveEffects
- scheduleCallback 触发 flushPassiveEffects
- flushPassiveEffects 会设置优先级,内部遍历 rootWithPendingPassiveEffects,并执行 flushPassiveEffectsImpl

### flushPassiveEffectsImpl

- 调用 useEffect 在上一次 render 时的销毁函数(所有)

```js
// pendingPassiveHookEffectsUnmount中保存了所有需要执行销毁的useEffect
const unmountEffects = pendingPassiveHookEffectsUnmount;
pendingPassiveHookEffectsUnmount = [];
for (let i = 0; i < unmountEffects.length; i += 2) {
  const effect = ((unmountEffects[i]: any): HookEffect);
  const fiber = ((unmountEffects[i + 1]: any): Fiber);
  const destroy = effect.destroy;
  effect.destroy = undefined;

  if (typeof destroy === 'function') {
    // 销毁函数存在则执行
    try {
      destroy();
    } catch (error) {
      captureCommitPhaseError(fiber, error);
    }
  }
}
```

- 存储销毁函数和回调函数(layout 阶段 commitLayoutEffectOnFiber 方法内部的 schedulePassiveEffects)

```js
function schedulePassiveEffects(finishedWork: Fiber) {
  const updateQueue: FunctionComponentUpdateQueue | null = (finishedWork.updateQueue: any);
  const lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;
  if (lastEffect !== null) {
    const firstEffect = lastEffect.next;
    let effect = firstEffect;
    do {
      const { next, tag } = effect;
      if ((tag & HookPassive) !== NoHookEffect && (tag & HookHasEffect) !== NoHookEffect) {
        // 向`pendingPassiveHookEffectsUnmount`数组内`push`要销毁的effect
        enqueuePendingPassiveHookEffectUnmount(finishedWork, effect);
        // 向`pendingPassiveHookEffectsMount`数组内`push`要执行回调的effect
        enqueuePendingPassiveHookEffectMount(finishedWork, effect);
      }
      effect = next;
    } while (effect !== firstEffect);
  }
}
```

- 调用该 useEffect 在本次 render 时的回调函数

```js
// pendingPassiveHookEffectsMount中保存了所有需要执行回调的useEffect
const mountEffects = pendingPassiveHookEffectsMount;
pendingPassiveHookEffectsMount = [];
for (let i = 0; i < mountEffects.length; i += 2) {
  const effect = ((mountEffects[i]: any): HookEffect);
  const fiber = ((mountEffects[i + 1]: any): Fiber);

  try {
    const create = effect.create;
    effect.destroy = create();
  } catch (error) {
    captureCommitPhaseError(fiber, error);
  }
}
```

- 如果存在同步任务,不需要等待下次事件循环的宏任务,提前执行他

## useLayoutEffect

- 类似 useEffect,但是是同步执行,无需调度
- `mutation 阶段会同步执行` useLayoutEffect hook 的销毁函数
- `layout 阶段会同步执行` useLayoutEffect hook 的回调函数

## useMemo 和 useCallback

### mount

```js
function mountMemo<T>(nextCreate: () => T, deps: Array<mixed> | void | null): T {
  // 创建并返回当前hook
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  // 计算value
  const nextValue = nextCreate();
  // 将value与deps保存在hook.memoizedState
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function mountCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  // 创建并返回当前hook
  const hook = mountWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  // 将value与deps保存在hook.memoizedState
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

### update

```js
function updateMemo<T>(nextCreate: () => T, deps: Array<mixed> | void | null): T {
  // 返回当前hook
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;

  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      // 判断update前后value是否变化
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 未变化
        return prevState[0];
      }
    }
  }
  // 变化,重新计算value
  const nextValue = nextCreate();
  hook.memoizedState = [nextValue, nextDeps];
  return nextValue;
}

function updateCallback<T>(callback: T, deps: Array<mixed> | void | null): T {
  // 返回当前hook
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  const prevState = hook.memoizedState;

  if (prevState !== null) {
    if (nextDeps !== null) {
      const prevDeps: Array<mixed> | null = prevState[1];
      // 判断update前后value是否变化
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 未变化
        return prevState[0];
      }
    }
  }

  // 变化,将新的callback作为value
  hook.memoizedState = [callback, nextDeps];
  return callback;
}
```

## useRef

### mount

```js
function mountRef<T>(initialValue: T) {
  // 获取当前useRef hook
  const hook = mountWorkInProgressHook();
  // 创建ref
  const ref = { current: initialValue };
  hook.memoizedState = ref;
  return ref;
}
```

### update

```js
function updateRef<T>(initialValue: T) {
  // 获取当前useRef hook
  const hook = updateWorkInProgressHook();
  // 返回保存的数据
  return hook.memoizedState;
}
```

### React.createRef

```js
export function createRef(): RefObject {
  const refObject = {
    current: null,
  };
  return refObject;
}
```

### ref 的工作流程

- HostComponent、ClassComponent、ForwardRef 可以赋值 ref 属性
- ForwardRef 只是将 ref 作为第二个参数传递下去,不会进入 ref 的工作流程
- render 阶段为含有 ref 属性的 fiber 添加 Ref effectTag
- commit 阶段为包含 Ref effectTag 的 fiber 执行对应操作

### render 阶段

```js
// beginWork的markRef
function markRef(current: Fiber | null, workInProgress: Fiber) {
  const ref = workInProgress.ref;
  if ((current === null && ref !== null) || (current !== null && current.ref !== ref)) {
    // Schedule a Ref effect
    workInProgress.effectTag |= Ref;
  }
}

// completeWork的markRef
function markRef(workInProgress: Fiber) {
  workInProgress.effectTag |= Ref;
}
```

- beginWork: `updateClassComponent`内的 finishClassComponent,`updateHostComponent`
- completeWork: `HostComponent`类型、`ScopeComponent`类型

### commit 阶段

- mutation 阶段中,对于 ref 属性改变的情况,需要先移除之前的 ref

```js
function commitMutationEffects(root: FiberRoot, renderPriorityLevel) {
  while (nextEffect !== null) {
    const effectTag = nextEffect.effectTag;
    // ...

    if (effectTag & Ref) {
      const current = nextEffect.alternate;
      if (current !== null) {
        // 移除之前的ref
        commitDetachRef(current);
      }
    }
  }
}

function commitDetachRef(current: Fiber) {
  const currentRef = current.ref;
  if (currentRef !== null) {
    if (typeof currentRef === 'function') {
      // function类型ref,调用他,传参为null
      currentRef(null);
    } else {
      // 对象类型ref,current赋值为null
      currentRef.current = null;
    }
  }
}
```

- mutation 阶段中,对于 Deletion effectTag 的 fiber 执行 commitDeletion

```js
function safelyDetachRef(current: Fiber) {
  const ref = current.ref;
  if (ref !== null) {
    if (typeof ref === 'function') {
      try {
        ref(null);
      } catch (refError) {
        captureCommitPhaseError(current, refError);
      }
    } else {
      ref.current = null;
    }
  }
}
```

- layout 阶段 commitLayoutEffect 会执行 commitAttachRef(赋值 ref)

```js
function commitAttachRef(finishedWork: Fiber) {
  const ref = finishedWork.ref;
  if (ref !== null) {
    // 获取ref属性对应的Component实例
    const instance = finishedWork.stateNode;
    let instanceToUse;
    switch (finishedWork.tag) {
      case HostComponent:
        instanceToUse = getPublicInstance(instance);
        break;
      default:
        instanceToUse = instance;
    }

    // 赋值ref
    if (typeof ref === 'function') {
      ref(instanceToUse);
    } else {
      ref.current = instanceToUse;
    }
  }
}
```
