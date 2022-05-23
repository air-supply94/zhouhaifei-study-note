---
title: lifeCircle
order: 3
---

## 生命周期

![lifeCircle](../../assets/frame/react/lifeCircle.png)

- `componentDidCatch`(error, errorInfo)
- getDerivedStateFromProps(nextProps, previousState) => newState
- shouldComponentUpdate(nextProps, nextState) => boolean
- getSnapshotBeforeUpdate(previousProps, previousState) => `snapshot`
  - 配合 React 新的异步渲染的机制,在 DOM 更新发生前被调用,返回值将作为 componentDidUpdate 的第三个参数
- componentDidUpdate(previousProps, previousState, `snapshot`)
