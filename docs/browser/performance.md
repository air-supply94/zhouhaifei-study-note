---
title: performance
order: 6
---

## DOMContentLoaded

构建 DOM 所需要的 HTML 文件、JavaScript 文件、CSS 文件都已经下载完成了

## Load

已经加载了所有的资源(图像、样式表等)

## Queuing

- 当浏览器发起一个请求的时候，会有很多原因导致该请求不能被立即执行，而是需要排队等待
- 排队时间过久，大概率是由浏览器为每个域名最多维护 6 个连接导致的
- 开启 http2

## CLS

Cumulative Layout Shift 累积布局偏移

### 概念

测量整个页面生命周期内发生的所有意外布局偏移中最大一连串的布局偏移分数

### 目标

分数控制在 0.1 以内

## FCP

First Contentful Paint 首次内容绘制

### 概念

指标测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间.包含文本、图像、svg 元素、非白色 canvas

### 目标

1.8s 以内

## LCP

Largest Contentful Paint 最大内容绘制

### 概念

根据页面首次开始加载的时间点来报告可视区域内可见的最大图像或文本块完成渲染的相对时间

### 目标

控制在 2.5 秒以内

## FID

First Input Delay 首次输入延迟

### 概念

测量从用户第一次与页面交互(单击链接、点按钮)直到浏览器对交互作出响应，并实际能够开始处理事件处理程序所经过的时间

### 目标

控制在 100 毫秒以内

## TTFB

### 概念

Time to First Byte,即用户浏览器接收页面内容的第一个字节所需的时间

### 临界点

600 毫秒

### 可能原因

- 服务器生成页面数据的时间过久
- 网络
- 发送请求头时带上了多余的用户信息

## performance.timing

### 说明

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

### 主要指标

- DNS 查询耗时 = domainLookupEnd - domainLookupStart
- TCP 链接耗时 = connectEnd - connectStart
- request 请求耗时 = responseEnd - responseStart
- 解析 dom 树耗时 = domComplete - domInteractive
- 白屏时间 = domLoading - fetchStart
- domReady 时间 = domContentLoadedEventEnd - fetchStart
- onload 时间 = loadEventEnd - fetchStart