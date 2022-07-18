---
title: 指标
order: 1
---

## 加载

### DNS 查询

- 公式: performance.timing.domainLookupEnd - performance.timing.domainLookupStart

### TCP 链接

- 公式: performance.timing.connectEnd - performance.timing.connectStart

### TTFB

- 概念: Time to First Byte.即用户浏览器接收页面内容的第一个字节所需的时间
- 临界点: 600 毫秒
- 可能原因
  - 服务器生成页面数据的时间过久
  - 网络
  - 发送请求头时带上了多余的用户信息

### 白屏时间

- 公式: performance.timing.domLoading - performance.timing.fetchStart

### FCP

- 名称: First Contentful Paint 首次内容绘制
- 概念: 测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间.文本或者图像或者 svg 元素或者非白色 canvas
- 目标: 1.8 秒以内

### LCP

- 名称: Largest Contentful Paint 最大内容绘制
- 概念: 根据页面首次开始加载的时间点来报告可视区域内可见的最大图像或文本块完成渲染的相对时间
- 目标: 2.5 秒以内

## 交互性

### FID

- 名称: First Input Delay 首次输入延迟
- 概念: 测量从用户第一次与页面交互(单击链接、点按钮)直到浏览器对交互作出响应,并实际能够开始处理事件处理程序所经过的时间
- 目标: 控制在 100 毫秒以内

## 视觉稳定

### CLS

- 名称: Cumulative Layout Shift 累积布局偏移
- 概念: 测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数
- 目标: 分数控制在 0.1 以内

## 说明

- connectStart 和 connectEnd: TCP 建立连接和连接成功的时间节点
- domComplete: html 文档完全解析完毕的时间节点
- domContentLoadedEventStart 和 domContentLoadedEventEnd
- domInteractive: 解析 html 文档的状态为 interactive 时的时间节点
- domLoading: 开始解析 html 文档的时间节点
- domainLookupStart 和 domainLookupEnd
- fetchStart: 是指在浏览器发起任何请求之前的时间值
- loadEventStart 和 loadEventEnd: onload 事件触发和结束的时间节点
- redirectStart 和 redirectEnd
- responseStart 和 responseEnd

## 主要指标

- request 请求耗时 = responseEnd - responseStart
- 解析 dom 树耗时 = domComplete - domInteractive
- domReady 时间 = domContentLoadedEventEnd - fetchStart
- onload 时间 = loadEventEnd - fetchStart
