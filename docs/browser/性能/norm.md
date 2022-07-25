---
title: 指标
order: 2
---

---

## [PerformanceTiming](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceTiming)

## FCP

- First Contentful Paint 首次内容绘制。测量页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间.文本或者图像或者 svg 元素或者非白色 canvas
- `1.8s 以内`

## `LCP`

- Largest Contentful Paint 最大内容绘制。根据页面首次开始加载的时间点来报告可视区域内可见的最大图像或文本块完成渲染的相对时间
- `2.5s 以内`

### 所有记录时间点

- `navigationStart`
- `redirectStart`和`redirectEnd`
- `domainLookupEnd`和`domainLookupStart`
- `connectEnd`和`connectStart`
- `requestStart`和`responseStart`和`responseEnd`
- `domLoading`和`domInteractive`和`domContentLoadedEventEnd`和`domComplete`和`loadEventEnd`

### 重定向

performance.timing.redirectEnd - performance.timing.redirectStart

### DNS 查询

performance.timing.domainLookupEnd - performance.timing.domainLookupStart

### TCP 连接

performance.timing.connectEnd - performance.timing.connectStart

### `请求耗时`

performance.timing.responseStart - performance.timing.requestStart

### `内容传输`

performance.timing.responseEnd - performance.timing.responseStart

### `资源解析`

performance.timing.domLoading - performance.timing.responseEnd

### `dom解析`

performance.timing.domInteractive - performance.timing.domLoading

### `dom渲染及资源加载`

performance.timing.domComplete - performance.timing.domInteractive

---

## FID

- First Input Delay 首次输入延迟。测量从用户第一次与页面交互(单击链接、点按钮)直到浏览器对交互作出响应,并实际能够开始处理事件处理程序所经过的时间
- `100ms 以内`

## FPS

### 判断标准

连续 n(3)次 fps 小与一个最小值(20)

### 代码

```js
var fps_compatibility = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var fps_config = {
  lastTime: performance.now(),

  lastFameTime: performance.now(),

  frame: 0,
};

var fps_loop = function () {
  var _first = performance.now();
  var _diff = _first - fps_config.lastFameTime;

  fps_config.lastFameTime = _first;
  fps_config.frame++;

  if (_first > 1000 + fps_config.lastTime) {
    var fps = Math.round((fps_config.frame * 1000) / (_first - fps_config.lastTime));

    console.log(`time: ${new Date()} fps is：`, fps);

    fps_config.frame = 0;

    fps_config.lastTime = _first;
  }

  fps_compatibility(fps_loop);
};

fps_loop();

function isBlocking(fpsList, below = 20, last = 3) {
  var count = 0;

  for (var i = 0; i < fpsList.length; i++) {
    if (fpsList[i] && fpsList[i] < below) {
      count++;
    } else {
      count = 0;
    }

    if (count >= last) {
      return true;
    }
  }

  return false;
}
```

---

### 公式

1000 \* N / X: 假设页面加载用时 X ms,这期间 requestAnimationFrame 执行了 N 次

---

## 网络环境

## 浏览器分布

- google
- edge
- fireFox
- ie
- 360 极速
- 其他

## PV(访问量)

- 页面 path
- 相关页面排行(TOP30)

## UV(独立访客)

- cookie
- 浏览器 id(收费)
