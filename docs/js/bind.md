---
title: bind
order: 3
---

### 原理

```js
function bind(fn, context) {
  if (typeof fn !== 'function') {
    throw new Error('fn not funtion');
  }

  var args = Array.prototype.slice.call(arguments, 2);

  function fBound() {
    var bindArgs = Array.prototype.slice.call(arguments);
    return fn.apply(context, args.concat(bindArgs));
  }

  return fBound;
}
```
