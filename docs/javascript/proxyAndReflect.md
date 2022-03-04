### Proxy

- 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写
- get(target, propKey, receiver)：拦截对象属性的读取，比如 proxy.foo 和 proxy['foo']。
- set(target, propKey, value, receiver)：拦截对象属性的设置，比如 proxy.foo = v 或 proxy['foo'] = v，返回一个布尔值

### Reflect

- 将 Object 对象的一些明显属于语言内部的方法放到 Reflect 对象上
- 修改某些 Object 方法的返回结果，让其变得更合理
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
