---
title: 方法
order: 3
---

## 加载优化

### 关键点

- 关键资源个数
- 关键资源大小
- 请求关键资源需要多少个 RTT

### DNS

- DNS 预读取

```html
<meta http-equiv="x-dns-prefetch-control" content="on" />
```

- DNS 预加载

```html
<link rel="dns-prefetch" href="www.domain.com/" />
```

### TCP 网络

- 增加客户端和服务器配置
- 增加客户端和服务器带宽
- http2
- cookie 瘦身

### 静态资源

- html 文件协商缓存
- gzip、br 压缩
- 强弱缓存
- oss

## 解析渲染优化

- 尽可能的精简 HTML 的代码和结构
- 尽可能的优化 CSS 文件和结构
- css 在前,js 在后
- 尽量不要使用内联的 JS 代码
- 合理使用 async 和 defer

## css 优化

- 避免使用@import,外部的 css 文件中使用@import 会使得页面在加载时增加额外的延迟
- 避免过分重排
- css 动画启用 GPU 加速,css3 转换,css3d 变换
- 有选择地使用选择器(从右往左匹配)
  - 保持简单,不要使用嵌套过多过于复杂的选择器
  - 通配符和属性选择器效率最低,需要匹配的元素最多,尽量避免使用.
  - 不要使用类选择器和 ID 选择器修饰元素标签
- 减少使用昂贵的属性
  - box-shadow
  - border-radius
  - filter
  - opacity
  - :nth-child(n)

## webpack 优化

### 用户性能

- 资源 prefetch(preload-webpack-plugin)
- contentHash
- html 文件压缩(html-webpack-plugin)
- css 文件压缩(css-minimizer-webpack-plugin)
- js 文件压缩(terser-webpack-plugin)
- gzip 压缩(compression-webpack-plugin)
- 浏览器兼容(polyfill)
- 路由懒加载
- 按需引入和合理配置 splitChunks
- external
- tree shaking
  - es6 模块
  - babel 下@babel/preset-env 下 modules: false
  - sideEffects
- moduleIds: 'deterministic'
- runtimeChunk: 'single'

### 打包流程

- thread-loader
- Resolve
  - modules
  - extensions
- alias
- sourceMap 方式
- webpack5 的 asset,asset/resource
- loader 的 include 和 exclude
- 样式文件 dev 开启 style-loader 热更新
- cache: filesystem
- babel-loader+ @babel/preset-typescript + ForkTsCheckerWebpackPlugin

## React

- 状态影响范围尽可能小
- pureComponent,React.memo(component, equalFunction)
- 函数组件
- 事件函数(避免内联)
- 合理 key
- React.lazy,React.Suspense

## 图片优化

- webp
- 懒加载
- 压缩
- base64

### 懒加载原理

当图片出现在可视区域时,获取图片的真实地址并赋值给图片即可

- [lazysizes](https://github.com/aFarkas/lazysizes)
- [react-lazyload](https://github.com/twobin/react-lazyload)

## 交互优化

- 节流(throttle),防抖(debounce)
- 减少 JavaScript 脚本执行时间(Web Workers)
- 避免强制同步布局: JavaScript 强制将计算样式和布局操作提前到当前的任务中

```js
function foo() {
  let main_div = document.getElementById('mian_div');
  let new_node = document.createElement('li');
  let textnode = document.createTextNode('time.geekbang');
  new_node.appendChild(textnode);
  document.getElementById('mian_div').appendChild(new_node);
  // 由于要获取到 offsetHeight,
  // 但是此时的 offsetHeight 还是老的数据,
  // 所以需要立即执行布局操作
  console.log(main_div.offsetHeight);
}
```

- 避免布局抖动: 是指在一次 JavaScript 执行过程中,多次执行强制布局和抖动操作

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

- 合理利用 CSS 合成动画(合成线程),requestAnimationFrame
- 合理利用 requestIdleCallback

## 长列表优化

Virtual List

### 原理

- 监听页面滚动(或者其他导致视口变化的事件)
- 滚动时根据滚动的距离计算需要展示的列表项
- 将列表项中展示的数据与组件替换成当前需要展示的内容
- 修改偏移量到对应的位置

### 插件

- [react-virtualized](https://github.com/bvaughn/react-virtualized)
- [react-window](https://github.com/bvaughn/react-window)

## 待定

- 本地缓存
- DNS 查询
- HTTP 请求
- 数据缓存
  - Service Worker
  - 本地存储的接口缓存和 CDN
- 重定向
- 页面解析和渲染阶段
