---
title: instanceof
order: 2
---

### 原理

```js
function instanceOf(leftValue, rightValue) {
  let rightProto = rightValue.prototype;
  leftValue = Object.getPrototypeOf(leftValue);

  while (rightProto !== null && leftValue !== rightValue) {
    if (leftValue === null) {
      return false;
    }

    leftValue = Object.getPrototypeOf(leftValue);
  }

  return true;
}
```
