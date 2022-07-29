---
title: 交互
order: 40
---

## FID

- First Input Delay 首次输入延迟。测量从用户第一次与页面交互(单击链接、点按钮)直到浏览器对交互作出响应,并实际能够开始处理事件处理程序所经过的时间
- `100ms 以内`
- `支持抽样`
- web-vitals 下的`getFID`

## FPS

- `支持抽样`
- 每隔 n 秒采集一次

### 异常判断标准

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

### 公式

1000 \* N / X: 假设页面加载用时 X ms,这期间 requestAnimationFrame 执行了 N 次

## 展示方式

### 按时间分布

和首屏耗时分布类似

### 异常待定
