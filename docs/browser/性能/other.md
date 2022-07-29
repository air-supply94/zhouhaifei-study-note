---
title: 其它指标
order: 50
---

## 网络环境

### 原理

2 个请求图片(1 字节或者几十字节)的响应时间求平均

### 展示方式

时间分布

## 浏览器分布

### 原理

```js
function getUserAgentInfo() {
  var userAgent = navigator.userAgent;
  var version;
  if (/opera/i.test(userAgent) || /OPR/i.test(userAgent)) {
    version = getVersion(userAgent, 'OPR/(\\d+\\.+\\d+)');
    return 'Opera' + version;
  } else if (/compatible/i.test(userAgent) && /MSIE/i.test(userAgent)) {
    version = getVersion(userAgent, 'MSIE (\\d+\\.+\\d+)');
    return 'IE' + version;
  } else if (/Edge/i.test(userAgent)) {
    version = getVersion(userAgent, 'Edge/(\\d+\\.+\\d+)');
    return 'Edge' + version;
  } else if (/Firefox/i.test(userAgent)) {
    version = getVersion(userAgent, 'Firefox/(\\d+\\.+\\d+)');
    return 'Firefox' + version;
  } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
    version = getVersion(userAgent, 'Safari/(\\d+\\.+\\d+)');
    return 'Safari' + version;
  } else if (/Chrome/i.test(userAgent) && /Safari/i.test(userAgent)) {
    version = getVersion(userAgent, 'Chrome/(\\d+\\.+\\d+)');
    return 'Chrome' + version;
  } else if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    version = 11;
    return 'IE' + version;
  }
}

function getVersion(userAgent, reg) {
  var reBrowser = new RegExp(reg);
  reBrowser.test(userAgent);
  return parseFloat(RegExp['$1']);
}
```

## PV 和 UV

### 公共参数

- `终端类型`
- `产品类型`
- `指标类型`
- `路由路径(尾下划线处理)`

### 识别原理

- cookie
- 浏览器 id(收费)

### 展示方式

按端和项目类型统计相应数量,`饼图`
