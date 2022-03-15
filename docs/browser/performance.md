---
title: performance
order: 6
---

## 性能指标

### DOMContentLoaded

构建 DOM 所需要的 HTML 文件、JavaScript 文件、CSS 文件都已经下载完成了

### Load

已经加载了所有的资源(图像、样式表等)

### Queuing

当浏览器发起一个请求的时候，会有很多原因导致该请求不能被立即执行，而是需要排队等待

- 排队时间过久，大概率是由浏览器为每个域名最多维护 6 个连接导致的
- 开启 http2

### TTFB

第一字节时间

- 服务器生成页面数据的时间过久
- 网络的原因
- 发送请求头时带上了多余的用户信息

### 白屏

提交数据之后渲染进程会创建一个空白页面，并等待 CSS 文件和 JavaScript 文件的加载完成，生成 CSSOM 和 DOM，然后合成布局树，最后还要经过一系列的步骤准备首次渲染

## 性能优化

### 加载阶段

- 关键资源个数
- 关键资源大小
- 请求关键资源需要多少个 RTT

### 交互阶段

- 减少 JavaScript 脚本执行时间
  - 将一次执行的函数分解为多个任务，使得每次的执行时间不要过久
  - 采用 Web Workers
- 避免强制同步布局： JavaScript 强制将计算样式和布局操作提前到当前的任务中

```js
function foo() {
  let main_div = document.getElementById('mian_div');
  let new_node = document.createElement('li');
  let textnode = document.createTextNode('time.geekbang');
  new_node.appendChild(textnode);
  document.getElementById('mian_div').appendChild(new_node);
  // 由于要获取到 offsetHeight，
  // 但是此时的 offsetHeight 还是老的数据，
  // 所以需要立即执行布局操作
  console.log(main_div.offsetHeight);
}
```

- 避免布局抖动: 是指在一次 JavaScript 执行过程中，多次执行强制布局和抖动操作

```js
function foo() {
  let time_li = document.getElementById('time_li');
  for (let i = 0; i < 100; i++) {
    let main_div = document.getElementById('mian_div');
    let new_node = document.createElement('li');
    let textnode = document.createTextNode('time.geekbang');
    new_node.appendChild(textnode);
    new_node.offsetHeight = time_li.offsetHeight;
    document.getElementById('mian_div').appendChild(new_node);
  }
}
```

- 合理利用 CSS 合成动画(合成线程)
- 避免频繁的垃圾回收
