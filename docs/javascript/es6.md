---
title: es6
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

## WeakSet

- 成员只能是对象，而不能是其他类型的值
- WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中
- WeakSet 的成员是不适合引用的，因为它会随时消失。另外，由于 WeakSet 内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，WeakSet 不可遍历

## WeakMap 同 2，3
