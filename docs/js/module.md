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

## [require('x')](https://www.ruanyifeng.com/blog/2015/05/require.html)

### 执行流程

- 如果 X 是内置模块,返回该模块
- 如果 X 以 "./" 或者 "/" 或者 "../" 开头
  - 根据 X 所在的父模块,确定 X 的绝对路径
  - 将 X 当成文件,依次查找下面文件,只要其中有一个存在,就返回该文件,不再继续执行
    - X
    - X.js
    - X.json
    - X.node
- 将 X 当成目录,依次查找下面文件,只要其中有一个存在,就返回该文件,不再继续执行
  - X/package.json(main 字段)
  - X/index.js
  - X/index.json
  - X/index.node
- 如果 X 不带路径
  - 根据 X 所在的父模块,确定 X 可能的安装目录
  - 依次在每个目录中,将 X 当成文件名或目录名加载

### Module

```js
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

module.exports = Module;

var module = new Module(filename, parent);
```

### require

- 原型 require

```js
Module.prototype.require = function (path) {
  return Module._load(path, this);
};
```

- \_load

```js
Module._load = function (request, parent, isMain) {
  //  计算绝对路径
  var filename = Module._resolveFilename(request, parent);

  //  第一步：如果有缓存，取出缓存
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;
  }
  // 第二步：是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename);
  }

  // 第三步：生成模块实例，存入缓存
  var module = new Module(filename, parent);
  Module._cache[filename] = module;

  // 第四步：加载模块
  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }

  // 第五步：输出模块的exports属性
  return module.exports;
};
```

### 模块的绝对路径

```js
Module._resolveFilename = function (request, parent) {
  // 第一步：如果是内置模块，不含路径返回
  if (NativeModule.exists(request)) {
    return request;
  }

  // 第二步：确定所有可能的路径
  var resolvedModule = Module._resolveLookupPaths(request, parent);
  var id = resolvedModule[0];
  var paths = resolvedModule[1];

  // 第三步：确定哪一个路径为真
  var filename = Module._findPath(request, paths);
  if (!filename) {
    var err = new Error("Cannot find module '" + request + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }
  return filename;
};
```

### \_findPath

```js
Module._findPath = function (request, paths) {
  // 列出所有可能的后缀名：.js，.json, .node
  var exts = Object.keys(Module._extensions);

  // 如果是绝对路径，就不再搜索
  if (request.charAt(0) === '/') {
    paths = [''];
  }

  // 是否有后缀的目录斜杠
  var trailingSlash = request.slice(-1) === '/';

  // 第一步：如果当前路径已在缓存中，就直接返回缓存
  var cacheKey = JSON.stringify({ request: request, paths: paths });
  if (Module._pathCache[cacheKey]) {
    return Module._pathCache[cacheKey];
  }

  // 第二步：依次遍历所有路径
  for (var i = 0, PL = paths.length; i < PL; i++) {
    var basePath = path.resolve(paths[i], request);
    var filename;

    if (!trailingSlash) {
      // 第三步：是否存在该模块文件
      filename = tryFile(basePath);

      if (!filename && !trailingSlash) {
        // 第四步：该模块文件加上后缀名，是否存在
        filename = tryExtensions(basePath, exts);
      }
    }

    // 第五步：目录中是否存在 package.json
    if (!filename) {
      filename = tryPackage(basePath, exts);
    }

    if (!filename) {
      // 第六步：是否存在目录名 + index + 后缀名
      filename = tryExtensions(path.resolve(basePath, 'index'), exts);
    }

    // 第七步：将找到的文件路径存入返回缓存，然后返回
    if (filename) {
      Module._pathCache[cacheKey] = filename;
      return filename;
    }
  }

  // 第八步：没有找到文件，返回false
  return false;
};
```

### 加载模块

- load

```js
Module.prototype.load = function (filename) {
  var extension = path.extname(filename) || '.js';
  if (!Module._extensions[extension]) extension = '.js';
  Module._extensions[extension](this, filename);
  this.loaded = true;
};
```

- 模块的后缀名

```js
Module._extensions['.js'] = function (module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(stripBOM(content), filename);
};

Module._extensions['.json'] = function (module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  try {
    module.exports = JSON.parse(stripBOM(content));
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
};
```

- \_compile

```js
Module.prototype._compile = function (content, filename) {
  var self = this;
  var args = [self.exports, require, self, filename, dirname];
  return compiledWrapper.apply(self.exports, args);
};
```

```js
(function (exports, require, module, __filename, __dirname) {
  // 模块源码
});
```

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
