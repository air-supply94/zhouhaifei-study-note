---
title: decorator
order: 12
---

### 概念

是一种与类(class)相关的语法,用来注释或修改类和类方法

### 类的装饰

```js
@decorator
class Test {}

/**
 * @param target 类本身
 */
function decorator(target) {}
```

### 方法装饰

```js
class Test {
  @decorator
  test() {}
}

/**
 *
 * @param target 类本身
 * @param name 方法名
 * @param descriptor 属性描述器
 */
function decorator(target, name, descriptor) {}
```

### 执行顺序

从下到上

### core-decorators.js

- @autobind
- @readonly
- @override
- @deprecate
- @suppressWarnings
