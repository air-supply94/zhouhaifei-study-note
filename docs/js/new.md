---
title: new
order: 5
---

### 原理

```js
function _new(fn) {
  const obj = new Object();
  const _prototype = fn.prototype;
  if (_prototype !== null) {
    Object.setPrototypeOf(obj, _prototype);
  }
  const result = fn.apply(obj, Array.prototype.slice.call(arguments, 1));

  if (typeof result === 'object' && result !== null) {
    return result;
  } else {
    return obj;
  }
}
```
