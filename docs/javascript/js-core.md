### 对象创建算法

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
