### 原理

```js
function New(fn) {
  const obj = new Object();
  const _prototype = fn.prototype;
  Object.setPrototypeOf(obj, _prototype === null ? Object.prototype : _prototype);
  const result = fn.apply(this, [].slice.call(arguments, 1));

  if (typeof result === 'object' && result !== null) {
    return result;
  } else {
    return obj;
  }
}
```
