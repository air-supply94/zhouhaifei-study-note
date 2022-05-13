---
title: iterator
order: 8
---

### 概念

- 它是一种接口,为各种不同的数据结构提供统一的访问机制

### 作用

- 为各种数据结构,提供一个统一的、简便的访问接口
- 使得数据结构的成员能够按某种次序排列
- ES6 创造了一种新的遍历命令 for...of 循环

### 遍历过程

next 方法返回对象,对象 value 代表数据,对象 done 表示是否遍历完毕

### 默认接口

- Array
- Map
- Set
- String
- TypedArray
- 函数的 arguments 对象
- NodeList 对象
- Symbol.iterator

### 调用场景

- 数组和 Set 结构进行解构赋值
- 扩展运算符
- yield\*
- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()(比如 new Map([['a',1],['b',2]]))
- Promise.all()
- Promise.race()
