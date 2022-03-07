---
title: ecmascript
order: 11
---

## super

### 对象方法简写

- 表示对象的原型对象

### 类中

- 作为函数调用: 代表父类的构造函数，注意，super 虽然代表了父类的构造函数，但是返回的是子类的实例，即 super 内部的 this 指的是的实例
- 作为对象时: 在普通方法中，指向父类的原型对象；this 指向子类实列 。在静态方法中，指向父类；this 指向子类

## Proxy

- 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
- get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值

## Reflect

- 将 Object 对象的一些明显属于语言内部的方法放到 Reflect 对象上
- 修改某些 Object 方法的返回结果，让其变得更合理
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)

## 严格模式

- 变量必须声明后再使用
- 函数的参数不能有同名属性，否则报错
- 不能使用 with 语句
- 不能对只读属性赋值，否则报错
- 不能使用前缀 0 表示八进制数，否则报错
- 不能删除不可删除的属性，否则报错
- 不能删除变量 delete prop，会报错，只能删除属性 delete global[prop]
- eval 不会在它的外层作用域引入变量
- eval 和 arguments 不能被重新赋值
- arguments 不会自动反映函数参数的变化
- 不能使用 arguments.callee
- 不能使用 arguments.caller
- 禁止 this 指向全局对象
- 不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
- 增加了保留字（比如 protected、static 和 interface）

## String

### slice

- slice(startIndex, endIndex)---取头不取尾
- -startIndex => length + startIndex
- -endIndex => length + endIndex

### substring

- substring(startIndex, endIndex)---取头不取尾
- 如果 endIndex 不存在，则将截取 startIndex 到末尾
- 如果 indexStart 等于 indexEnd，则 substring()返回一个空字符串
- 如果 indexStart 大于 indexEnd，则效果 substring()就好像两个参数交换一样

### substr

- substr(startIndex, length)
- 如果 startIndex 为正数则从 startIndex 开始计数
- 如果为负数从 str.length + startIndex 开始计数
- 如果 length 不存在(undefined)，则取全部
- 如果 length 为负数，则直接返回空字符串

### match(regExp)

返回结果和 exec 类似

### search(string || regExp)

找到则对应索引，否则-1

### replace(String || RegExp, newValue || callback)

- 返回替换过后的字符串
- callback(match, $n, offset, originText)
  - match: 匹配的字符串
  - $n: 捕获组
  - offset: 相对位置
  - originText: 原来的字符
- $n: 捕获组中的第 n 个元素
- $&: 匹配的字符串
- $$: $字符

### split(String || RegExp, [arrayLength])

- 匹配到 String || RegExp，按匹配的规则返回数组
- 没有匹配到则返回[oldString]
- 如果没有参数就返回一个数组，数组里面的第一个元素为此 string
- 如果为 spilt("")————返回 string 的每一个索引组成的数组
- 注意捕获组的情况

## RegExp

### 原子

- a-z A-Z 0-9 - \_
- \w \W \s \S \.(除/n 或/r 的任意字符)

### 元字符

- 转义
- () [] {} . \ ^ $ ? + \* |
- (?:)---将匹配的结果不进行存储
- (,)\1---对模式的引用

### 位置

- (?=n)
- (?!n)
- (?<=n)
- (?<!n)
- ^
- $
- \b---匹配单词边界
- \B---匹配非单词边界

### 限定符

- {m}
- {m,}
- {m,n}
- ?
- \+
- \*

### 实例属性

- global
- ignoreCase
- lastIndex: 开始搜索下一个匹配项的字符串，从 0 算起
- source: 正则表达式的字符串，按字面量形式

### 实例方法

- test
- exec(): 设置了 g，每一次也只会返回一项。多次调用，则在字符串中继续查找匹配项。没有匹配到返回 null
  - Array[0]: 匹配到的字符串
  - Array[1-n]: 捕获组
  - index: 匹配项在字符串中的索引
  - input: 源字符串

### 千分位

```ts
function thousandthSeparator(num: unknown): string {
  return String(num).replace(/\d+/, (n) => n.replace(/(?!^)(?=(\d{3})+$)/g, ','));
}
```
