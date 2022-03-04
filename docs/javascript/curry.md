---
title: curry
order: 4
---

### 原理

```js
function curry(fn, args) {
  var length = fn.length;

  args = Array.isArray(args) ? args : [];

  return function () {
    var _args = args.slice(0).concat(Array.prototype.slice.call(arguments));
    return _args.length < length ? curry.call(this, fn, _args) : fn.apply(this, _args);
  };
}
```
