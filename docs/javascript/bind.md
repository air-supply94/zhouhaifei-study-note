---
title: bind
order: 3
---

### 原理

```js
function _bind(context) {
  if (typeof context !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);

  function noop() {}

  function fBound() {
    var bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof noop ? this : context, args.concat(bindArgs));
  }

  noop.prototype = this.prototype;
  fBound.prototype = new noop();
  return fBound;
}
```
