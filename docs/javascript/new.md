---
title: new
order: 5
---

### 原理

```js
function New(fn) {
  const obj = new Object();
  const _prototype = fn.prototype;
  Object.setPrototypeOf(obj, _prototype === null ? Object.prototype : _prototype);
  const result = fn.apply(this, Array.prototype.slice.call(arguments));

  if (typeof result === 'object' && result !== null) {
    return result;
  } else {
    return obj;
  }
}
```
