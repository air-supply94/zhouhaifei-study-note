---
title: debounce
order: 14
---

```js
function debounce(func, wait, immediate) {
  var timer = null;
  function cancel() {
    clearTimeout(timer);
    timer = null;
  }

  function debounced() {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    clearTimeout(timer);

    if (immediate && timer === null) {
      func.apply(self, args);
    }

    timer = setTimeout(function () {
      func.apply(self, args);
    }, wait);
  }

  debounced.cancel = cancel;
  return debounced;
}
```
