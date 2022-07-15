---
title: babel
order: 1
nav:
  title: 框架
  order: 1
---

## 参考

- [官方](https://babeljs.io/blog/)
- [原理](https://bobi.ink/2019/10/01/babel/)
- [兼容性方案](https://juejin.cn/post/6976501655302832159)

## 配置

### stage-x

指处于某一阶段的 js 语言提案

- Stage 0 设想: 只是一个想法,可能有 Babel 插件
- Stage 1 建议 Proposal:这是值得跟进的
- Stage 2 草案 Draft: 初始规范
- Stage 3 候选 Candidate: 完成规范并在浏览器上初步实现
- Stage 4 完成 Finished: 将添加到下一个年度版本发布中

### core-js

和 babel 高度集成,是 babel 解决新特性在浏览器中兼容问题的核心依赖

### core-js@2

- `不用太关心此包和@babel/polyfill`
- library 模块: 不污染全局的 runtime 模块,供@babel/runtime-corejs2 引入
- modules 模块: 污染全局的 polyfill 模块,供@babel/polyfill 和@babel/preset-env 引入

### core-js@3

放弃了对@babel/polyfill 的支持,被@babel/preset-env 和@babel/runtime-corejs3 引入来进行新 api 的兼容处理

- core-js: 污染全局的 polyfill 包,供@babel/preset-env 使用
- core-js-pure: 不污染全局的 runtime 包,供@babel/runtime-corejs3 使用

### @babel/preset-env

- 预设置一组插件来便捷转换那些已经被正式纳入 TC39 中的语法
- 依赖 core-js 在全局和构造函数静态属性、实例属性上添加 api 的方式来解决 api 兼容性问题

```json
{
  "modules": false,
  "useBuiltIns": "usage",
  "corejs": {
    "version": 3,
    "proposals": true
  }
}
```

### runtime

核心思想是以引入替换的方式来解决兼容性问题

- 依赖 helpers、regenerator-runtime 模块来实现语法的替换
- helpers 中提供了一些语法模拟的函数
- regenerator-runtime 中实现了 async/await 语法的转换
- @babel/runtime: 只能处理语法替换
- @babel/runtime-corejs2: `不用特别关心`
- @babel/runtime-corejs3
  - 支持全局构造函数和静态方法兼容
  - 支持了实例方法的兼容,同时还支持对 ECMAScript 提案的 api 进行模拟

### @babel/plugin-transform-runtime

- 就是为了方便@babel/runtime 的使用

```json
{
  "corejs": 3,
  "proposals": true
}
```

## 处理流程

![](../assets/frame/babelProcess.png)

## 架构

![](../assets/frame/babelArch.png)

### @babel/core

架构中的内核

- 加载和处理配置(config)
- 加载插件
- 调用 Parser 进行语法解析,生成 AST
- 调用 Traverser 遍历 AST,并使用访问者模式应用插件对 AST 进行转换
- 生成代码,包括 SourceMap 转换和源代码生成

### 周边支撑

- Parser(@babel/parser): 将源代码解析为 AST
- Traverser(@babel/traverse): 实现了访问者模式,对 AST 进行遍历,转换插件会通过它获取感兴趣的 AST 节点,对节点继续操作
- Generator(@babel/generator): 将 AST 转换为源代码,支持 SourceMap

### 插件

- @babel/plugin-syntax-\*: @babel/parser 已经支持了很多 JavaScript 语法特性,实际上只是用于开启或者配置 Parser 的某个功能特性
- @babel/plugin-transform-\*: 普通的转换插件
- @babel/plugin-proposal-\*: 还在提议阶段(非正式)的语言特性
- @babel/presets-\*: 插件集合或者分组,主要方便用户对插件进行管理和使用.preset-env,preset-react

### 插件开发辅助

- @babel/template: 某些场景直接操作 AST 太麻烦,所以 Babel 实现了这么一个简单的模板引擎,可以将字符串代码转换为 AST
- @babel/types: AST 节点构造器和断言.插件开发时使用很频繁
- @babel/helper-\*: 一些辅助器,用于辅助插件开发
- @babel/helper: 辅助代码

### 工具

- @babel/node: Node.js CLI, 通过它直接运行需要 Babel 处理的 JavaScript 文件
- @babel/register: Patch NodeJs 的 require 方法,支持导入需要 Babel 处理的 JavaScript 模块
- @babel/cli: CLI 工具

## 访问者模式

转换器会遍历 AST 树,找出自己感兴趣的节点类型,再进行转换操作

### 一般遍历

```js
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;

const ast = babel.parseSync(code);

let depth = 0;
traverse(ast, {
  enter(path) {
    console.log(`enter ${path.type}(${path.key})`);
    depth++;
  },
  exit(path) {
    depth--;
    console.log(`  exit ${path.type}(${path.key})`);
  },
});
```

### 特定节点遍历

```js
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;

const ast = babel.parseSync(code);
traverse(ast, {
  // 访问标识符
  Identifier(path) {
    console.log(`enter Identifier`);
  },
  // 访问调用表达式
  CallExpression(path) {
    console.log(`enter CallExpression`);
  },
  // 二元操作符
  BinaryExpression: {
    enter(path) {},
    exit(path) {},
  },
  // 更高级的, 使用同一个方法访问多种类型的节点
  'ExportNamedDeclaration|Flow'(path) {},
});
```

### 节点上下文

```js
export class NodePath<T = Node> {
  constructor(hub: Hub, parent: Node);
  parent: Node;
  hub: Hub;
  contexts: TraversalContext[];
  data: object;
  shouldSkip: boolean;
  shouldStop: boolean;
  removed: boolean;
  state: any;
  opts: object;
  skipKeys: object;
  parentPath: NodePath;
  context: TraversalContext;
  container: object | object[];
  listKey: string; // 如果节点在一个数组中,这个就是节点数组的键
  inList: boolean;
  parentKey: string;
  key: string | number; // 节点所在的键或索引
  node: T;  // 🔴 当前节点
  scope: Scope; // 🔴当前节点所在的作用域
  type: T extends undefined | null ? string | null : string; // 🔴节点类型
  typeAnnotation: object;
}
```

### 副作用处理

- 删除父节点的兄弟节点、删除第一个子节点、新增兄弟节点
- 当这些操作污染了 AST 树后,访问者需要记录这些状态,响应式(Reactive)更新 Path 对象的关联关系,保证正确的遍历顺序,从而获得正确的转译结果

### 作用域处理

- AST 转换的前提是保证程序的正确性
- 在添加和修改引用时,需要确保与现有的所有引用不冲突
- Babel 本身不能检测这类异常
- Scope 属性表示作用域

```ts
interface Scope {
  path: NodePath;
  block: Node; // 所属的词法区块节点, 例如函数节点、条件语句节点
  parentBlock: Node; // 所属的父级词法区块节点
  parent: Scope; // ⚛️指向父作用域
  bindings: { [name: string]: Binding }; // ⚛️ 该作用域下面的所有绑定(即该作用域创建的标识符)
}
```

- 在词法区块(block)中,新建变量、函数、类、函数参数等创建的标识符,都属于这个区块作用域. 这些标识符也称为绑定(Binding),而对这些绑定的使用称为引用(Reference)

```ts
interface Binding {
  identifier: t.Identifier;
  scope: Scope;
  path: NodePath;
  kind: 'var' | 'let' | 'const' | 'module';
  referenced: boolean;
  references: number; // 被引用的数量
  referencePaths: NodePath[]; // ⚛️获取所有应用该标识符的节点路径
  constant: boolean; // 是否是常量
  constantViolations: NodePath[];
}
```
