---
title: curry
order: 4
---

### 原理

```js
function curry(fn, args) {
  if (typeof fn !== 'function') {
    throw new Error('fn not funtion');
  }

  var length = fn.length;

  args = Array.isArray(args) ? args : [];

  return function () {
    var _args = args.concat(Array.prototype.slice.call(arguments));
    if (_args.length < length) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}
```
