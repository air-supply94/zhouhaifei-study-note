---
title: module
order: 13
---

## CommonJS

### 基本语法

- 暴露模块: module.exports 或者 exports
- 引入模块: require

### 特点

- 每个文件就是一个模块,有自己的作用域
- 再次执行 require 命令不会再次执行该模块,而是到缓存之中取值
- `模块输出的是一个值的拷贝(原始值不变)`
- `模块是运行时加载`
- `加载是运行时同步加载`

### `循环加载`

一旦出现某个模块被循环加载,就只输出已经执行的部分,还未执行的部分不会输出

## ES6

### 概述

- 尽量的静态化,使得编译时就能确定模块的依赖关系,以及输入和输出的变量
- 模块不是对象,而是通过 export 命令显式指定输出的代码,再通过 import 命令输入
- export \*忽略该模块下的 default

### 特点

- 自动采用严格模式
- 模块之中，顶层的 this 关键字返回 undefined
- 同一个模块如果加载多次，将只执行一次
- `ES6 模块输出的是值的引用(原始值可变)`
- `模块是编译时输出接口`
- `import 命令是异步加载`,有一个独立的模块依赖的解析阶段

### `循环加载`

如果使用 import 从一个模块加载变量即,那些变量不会被缓存,而是成为一个指向被加载模块的引用

## AMD

浏览器异步加载方案,典型代表 require.js

### 定义

```js
define('模块id', ['依赖数组'], function (依赖) {});
```

### 引用

```js
require(['依赖数组'], function (依赖) {});
```

## UMD

社区想出来的一种整合了 CommonJS 和 AMD 两个模块定义规范的方法

```js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['b'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('b'));
  } else {
    root.returnExports = factory(root.b);
  }
})(this, function (b) {
  return {};
});
```
