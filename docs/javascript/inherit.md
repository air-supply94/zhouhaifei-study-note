### 原理

```js
var inherit = (function () {
  function F() {}

  return function (child, parent) {
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.superproto = parent.prototype;
    return child;
  };
})();

function A(x) {
  this.x = x;
}

A.prototype.x = 10;

function B(x) {
  B.superproto.constructor.apply(this, arguments);
}

inherit(B, A); // chaining prototypes

var b = new B(20);
console.log(b.x);
```
