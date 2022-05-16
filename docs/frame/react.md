---
title: React
order: 5
---

## 核心思路

- 声明式: 声明式编程的优势在于直观,可以做到一目了然,也便于组合
  - 命令式编程的主要思想是关注计算机执行的步骤
  - 声明式编程的主要思想是告诉计算机应该做什么,但不指定具体要怎么做
  - 函数式编程关注做什么而不是怎么做,函数第一位
- 组件化: 组件化可以降低系统间功能的耦合性,提高功能内部的聚合性
- 通用性: 不会直接操作 DOM 而是抽象为虚拟 DOM,不再局限于 Web 开发

## JSX

- JSX 是一个 JavaScript 的语法扩展,结构类似 XML(DSL)
- JSX 主要用于声明 React 元素,但 React 中并不强制使用 JSX.babel 最终都是转成 React.createElement
- 不引入 JavaScript 本身以外的开发体系.而是希望通过合理的关注点分离保持组件开发的纯粹性
  - 模板不应该是开发过程中的关注点,因为引入了模板语法、模板指令等概念,是一种不佳的实现方案
  - 模板字符串编写的结构会造成多次内部嵌套,使整个结构变得复杂,并且优化代码提示也会变得困难重重

## 生命周期

![lifeCircle](../assets/frame/react/lifeCircle.png)

- `componentDidCatch`(error, errorInfo)
- getDerivedStateFromProps(nextProps, previousState) => newState
- shouldComponentUpdate(nextProps, nextState) => boolean
- getSnapshotBeforeUpdate(previousProps, previousState) => `snapshot`
  - 配合 React 新的异步渲染的机制,在 DOM 更新发生前被调用,返回值将作为 componentDidUpdate 的第三个参数
- componentDidUpdate(previousProps, previousState, `snapshot`)

## 类组件与函数组件

- 在使用方式和最终呈现效果上都是完全一致的
- 类组件面向对象编程(type 为 function),函数组件面向函数式编程(type 为 class)
- 类组件特有的生命周期

## 设计组件

- `展示组件`: 展示组件内部是没有状态管理,完全受制于外部的 props 控制
- 代理组件: 常用于封装常用属性,减少重复代码
- 样式组件: 是一种代理组件,只是又细分了处理样式领域
- 布局组件: 基本设计与样式组件完全一样,主要用于安放其他组件
- `容器组件`: 几乎没有复用性,`拉取数据与组合组件`
- 高阶组件: 参数是组件,返回值为新组件的函数.主要用于: 抽取公共逻辑和渲染劫持
  - 丢失静态函数
  - refs 属性不能透传(React.forwardRef)
