---
title: 问题
order: 60
---

> 优化前后如何对比数据,如果我们只是对比上线前后的数据,怎么排除这段时间业务升级带来的影响?

- 时间
- 蓝绿部署灰度环境不采集

> 一个单页面应用,我们需要采集它的首屏时间,当我们采集首页的首屏指标时,用户恰好输入了一些东西导致页面跳转到了搜索结果页

- 采集前记录当前页面 path
- 采集后对比

> 接口异常导致的白屏、数据加载中产生的白屏、图片与视频加载过程或等待过程中的白屏如何监控

> 如果是抽样的数据,怎么能确保性能异常的数据不会被漏掉呢？

- 采集到数据后先对数据进行校验
- 如果发现数据异常则直接上报到数据异常平台
- 如果数据是正常范围内的,则结合采样率来看是否需要上报
