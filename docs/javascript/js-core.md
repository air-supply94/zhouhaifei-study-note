---
title: js-core
order: 12
---

### 标识符

函数名、变量名、函数的参数名称、全局对象非限定属性的名称

### this

- this=null--->this=window(es3)
- 10.1.6------只有全局的 VO 能直接访问，AO 是不能直接访问的。此时 this=null
- 10.2.3----如果 caller 提供的不是 obj，（null 不是对象），那么 this 值为 window
- 11.2.3 Function Calls---GetBase() ###object
  - 任何时间创建或设置对象 O 的非内部属性时，将立即使用与 O 连接的所有对象中的相同值和属性创建或设置相应的属性 。
  - 任何时候，对象 O 的非内部属性都被删除，所有与 O 连接的对象中的对象都将被立即删除

### 对象创建

```js
/**
 F.[[Construct]](initialParameters):

 O = new NativeObject();

 // property [[Class]] is set to "Object", i.e. simple object
 O.[[Class]] = "Object"

 // get the object on which
 // at the moment references F.prototype
 var __objectPrototype = F.prototype;

 // if __objectPrototype is an object, then:
 O.[[Prototype]] = __objectPrototype
 // else:
 O.[[Prototype]] = Object.prototype;
 // where O.[[Prototype]] is the prototype of the object

 // initialization of the newly created object
 // applying the F.[[Call]]; pass:
 // as this value – newly created object - O,
 // arguments are the same as initialParameters for F
 R = F.[[Call]](initialParameters); this === O;
 // where R is the returned value of the [[Call]]
 // in JS view it looks like:
 // R = F.apply(O, initialParameters);

 // if R is an object
 return R
 // else
 return O
 */
```

### 函数创建

```js

F = new NativeObject();

// property [[Class]] is "Function"
F.[[Class]] = "Function"

// a prototype of a function object
F.[[Prototype]] = Function.prototype

// reference to function itself
// [[Call]] is activated by call expression F()
// and creates a new execution context
F.[[Call]] = <reference to function>

// built in general constructor of objects
// [[Construct]] is activated via "new" keyword
// and it is the one who allocates memory for new
// objects; then it calls F.[[Call]]
// to initialize created objects passing as
// "this" value newly created object
F.[[Construct]] = internalConstructor

// scope chain of the current context
// i.e. context which creates function F
F.[[Scope]] = activeContext.Scope
// if this functions is created
// via new Function(...), then
F.[[Scope]] = globalContext.Scope

// number of formal parameters
F.length = countParameters

// a prototype of created by F objects
__objectPrototype = new Object();

__objectPrototype.constructor = F // {DontEnum}, is not enumerable in loops
F.prototype = __objectPrototype

return F
```

## 内部属性

### [[prototype]]

存在于每一个对象上，用来将物件写入到 prototype 中

### [[class]]

指示此对象的种类的字符串值，Object.prototype.toString(obj) ###[[value]] 与该对象相关联的内部信息状态 ###[[get]] 返回属性的值 ###[[put]] 将制定的属性设置为 value ###[[canPut]] 是否可以写入相关属性，value ###[[hasProperty]] 返回一个 boolean，对象是否具有给定名称的成员 ###[[delete]] ###[[defaultValue]] 返回与对象相对应的原始值（valueOf()方法被调用） ###[[construct]] 构造一个对象。通过 new 调用。实现这种内部方法的函数是构造函数 ###[[call]]

- 调用者提供的参数值列表。执行与对象相关联的代码。
- 就理解为 call()方法的前身 ###list type 表达式求值的中间结果 ###completion type 只用于语句评估的中间结果：break continue throw return ###[[get]]算法

```
1. If O doesn't have a property with name P, go to step 4.
2. Get the value of the property.
3. Return Result(2).
4. If the [[Prototype]] of O is null, return undefined.
5. Call the [[Get]] method of [[Prototype]] with property name P.
	6. Return Result(5).
```

### [[put]]

```
1. Call the [[CanPut]] method of O with name P.
2. If Result(1) is false, return.
3. If O doesn't have a property with name P, go to step 6.
4. Set the value of the property to V. The attributes of the property are not changed.
5. Return.
6. Create a property with name P, set its value to V and give it empty attributes.
7. Return.
```

### [[CanPut]]

```
1. If O doesn't have a property with name P, go to step 4.
2. If the property has the ReadOnly attribute, return false.
3. Return true.
4. If the [[Prototype]] of O is null, return true.
5. Call the [[CanPut]] method of [[Prototype]] of O with property name P.
6. Return Result(5).
```

### [[hasProperty]]

```
1. If O has a property with name P, return true.
2. If the [[Prototype]] of O is null, return false.
3. Call the [[HasProperty]] method of [[Prototype]] with property name P.
4. Return Result(3)
```

### [[delete]]

```
1. If O doesn't have a property with name P, return true.
2. If the property has the DontDelete attribute, return false.
3. Remove the property with name P from O.
4. Return true
```

### [[defaultValue]]

- When the [[DefaultValue]] method of O is called with hint String, the following steps are taken:

```
1. Call the [[Get]] method of object O with argument "toString".
2. If Result(1) is not an object, go to step 5.
3. Call the [[Call]] method of Result(1), with O as the this value and an empty argument list.
4. If Result(3) is a primitive value, return Result(3).
5. Call the [[Get]] method of object O with argument "valueOf".
6. If Result(5) is not an object, go to step 9.
7. Call the [[Call]] method of Result(5), with O as the this value and an empty argument list.
8. If Result(7) is a primitive value, return Result(7).
9. Throw a TypeError exception.
```

- When the [[DefaultValue]] method of O is called with hint Number, the following steps are taken:

```
1. Call the [[Get]] method of object O with argument "valueOf".
2. If Result(1) is not an object, go to step 5.
3. Call the [[Call]] method of Result(1), with O as the this value and an empty argument list.
4. If Result(3) is a primitive value, return Result(3).
5. Call the [[Get]] method of object O with argument "toString".
6. If Result(5) is not an object, go to step 9.
7. Call the [[Call]] method of Result(5), with O as the this value and an empty argument list.
8. If Result(7) is a primitive value, return Result(7).
9. Throw a TypeError exception.
```

### [[Reference]]

- GetBase()：Returns the base object component of the reference V.
- GetPropertyName(V). Returns the property name component of the reference V
- Getvalue()

```
1. If Type(V) is not Reference, return V.
2. Call GetBase(V).
3. If Result(2) is null, throw a ReferenceError exception.
4. Call the [[Get]] method of Result(2), passing GetPropertyName( V) for the property name.
5. Return Result(4).

```

### [[PutValue]]

```
1. If Type(V) is not Reference, throw a ReferenceError exception.
2. Call GetBase(V).
3. If Result(2) is null, go to step 6.
4. Call the [[Put]] method of Result(2), passing GetPropertyName(V) for the property name and W for the value.
5. Return.
6. Call the [[Put]] method for the global object, passing GetPropertyName(V) for the property name and W for the value.
7. Return.
```

### [[call]]

```
1. Establish a new execution context using F's FormalParameterList, the 	passed arguments list, and the this value as described in 10.2.3.
2. Evaluate F's FunctionBody.
3. Exit the execution context established in step 1, restoring the    	previous execution context.
4. If Result(2). type is throw then throw Result(2). value.
5. If Result(2). type is return then return Result(2). value.
6. (Result(2). type must be normal.) Return undefined.
```
