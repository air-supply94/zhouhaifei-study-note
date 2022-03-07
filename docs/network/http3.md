---
title: HTTP3
order: 13
---

### 大体原理

- HTTP 下层的 TCP 协议改成了 UDP
- 基于 UDP 的 QUIC 协议可以实现类似 TCP 的可靠性传输

### QUIC

- QUIC 有⾃己的一套机制可以保证传输的可靠性。当某个流发生丢包时，只会阻塞这个流，其他流不会受到影响
- TLS3 升级成了最新 1.3 版本，头部压缩算法也升级成 QPack
- HTTPS 要建立一个连接，要花费 6 次交互，先是建⽴三次握手，然后是 TLS/1.3 的三次握手。 QUIC 直接把以往的 TCP 和 TLS/1.3 的 6 次交互合并成 3 次，减少交互次数

### 总结

- QUIC 是⼀个在 UDP 之上的伪 TCP + TLS + HTTP/2 的多路复用协议
- QUIC 是新协议，对于很多网络设备，根本不知道什么是 QUIC，只会当做 UDP，这样会出现新问题