---
title: HTTP2
order: 12
---

## 思路

一个域名只使用一个 TCP 长连接和消除队头阻塞问题

## 改进

### ⼆进制格式

头信息和数据体都是二进制,头信息帧和数据帧

### 头部压缩

所有字段都会存入头信息表,生成一个索引号,同样字段只发送索引号(HPACK 算法)

### 数据流

每个请求或响应的所有数据包,称为一个数据流(Stream).每个数据流都标记着一个独一⽆二的编号

### 多路复⽤

一个连接中并发多个请求或响应,而不用按照顺序⼀一对应

### 服务器推送

### 可以设置请求的优先级

## 缺陷

### TCP 队头阻塞

一旦丢包,连接中的所有 HTTP 请求都必须等待这个丢了包被重传回来

### TCP 建立连接的延时
