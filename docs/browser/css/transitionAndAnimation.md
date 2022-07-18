---
title: 动画和过渡
order: 3
---

## transition

- transition-property: `默认all`
- transition-duration: `默认0`
- transition-timing-function: `默认ease`
  - linear
  - ease
  - ease-in
  - ease-out
  - ease-in-out
- transition-delay: `默认0`

## animation

### 定义

```css
@keyframes animations {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

### 引用

- animation-name
- animation-duration
- animation-timing-function: `同transition`
- animation-delay
- animation-iteration-count: infinite 或者 number
- animation-direction
  - normal: 正常方向`默认`
  - reverse: 反方向运行
  - alternate: 动画先正常运行再反方向运行,并持续交替运行
  - alternate-reverse: 动画先反运行再正方向运行,并持续交替运行
- animation-fill-mode: 检索或设置对象动画时间之外的状态
  - none: `默认`.不设置对象动画之外的状态
  - forwards: 设置对象状态为动画结束时的状态
  - backwards: 设置对象状态为动画开始时的状态
  - both: 设置对象状态为动画结束或开始的状态
- animation-play-state: 检索或设置对象动画的状态
  - running: `默认`
  - paused
