---
title: promise
order: 7
---

### promise.js

```js
class Promise {
  static PENDING = 'pending';

  static FULFILLED = 'fulfilled';

  static REJECTED = 'reject';

  static defer = function () {
    const dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve;
      dfd.reject = reject;
    });
    return dfd;
  };

  static deferred = Promise.defer;

  static resolvePromise = function (promise2, x, resolve, reject) {
    // x 与 promise 相等
    if (promise2 === x) {
      reject(new TypeError('Chaining cycle detected for promise'));
    }

    let called = false;
    if (x instanceof Promise) {
      // 判断 x 为 Promise
      x.then(
        (value) => {
          Promise.resolvePromise(promise2, value, resolve, reject);
        },
        (reason) => {
          reject(reason);
        },
      );
    } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
      // x 为对象或函数
      try {
        const then = x.then;
        if (typeof then === 'function') {
          then.call(
            x,
            (value) => {
              if (called) {
                return;
              }
              called = true;
              Promise.resolvePromise(promise2, value, resolve, reject);
            },
            (reason) => {
              if (called) {
                return;
              }
              called = true;
              reject(reason);
            },
          );
        } else {
          if (called) {
            return;
          }
          called = true;
          resolve(x);
        }
      } catch (e) {
        if (called) {
          return;
        }
        called = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  };

  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('Promise resolver ${executor} is not a function');
    }

    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  value = null;

  reason = null;

  state = Promise.PENDING;

  onFulfilledCallbacks = [];

  onRejectedCallbacks = [];

  resolve = (value) => {
    if (this.state === Promise.PENDING) {
      this.state = Promise.FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach((callback) => callback(value));
    }
  };

  reject = (reason) => {
    if (this.state === Promise.PENDING) {
      this.state = Promise.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach((callback) => callback(reason));
    }
  };

  then = (onFulfilled, onRejected) => {
    if (typeof onFulfilled !== 'function') {
      onFulfilled = function (value) {
        return value;
      };
    }

    if (typeof onRejected !== 'function') {
      onRejected = function (reason) {
        throw reason;
      };
    }

    const promise = new Promise((resolve, reject) => {
      if (this.state === Promise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            Promise.resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            Promise.resolvePromise(promise, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === Promise.PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value);
              Promise.resolvePromise(promise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason);
              Promise.resolvePromise(promise, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise;
  };
}

module.exports = Promise;
```

### package.json

```json
{
  "dependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests promise.js"
  }
}
```
