---
title: throttle
order: 15
---

```js
function throttle(func, wait) {
  var timer;
  var previous = 0;

  function cancel() {
    clearTimeout(timer);
    timer = null;
    previous = Date.now();
  }

  function throttled() {
    var self = this;
    var args = Array.prototype.slice.call(arguments);
    var restTime = wait - (Date.now() - previous);

    if (restTime <= 0 || restTime > wait) {
      cancel();
      func.apply(self, args);
    } else {
      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(self, args);
          cancel();
        }, restTime);
      }
    }
  }

  throttled.cancel = cancel;

  return throttled;
}
```
