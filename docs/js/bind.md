---
title: bind
order: 3
---

### 原理

```js
function bind(fn) {
  if (typeof fn !== 'function') {
    throw new Error('fn not funtion');
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  function fBound() {
    var bindArgs = Array.prototype.slice.call(arguments);
    return fn.apply(self, args.concat(bindArgs));
  }

  return fBound;
}
```
