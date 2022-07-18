---
title: flex
order: 2
---

## flex

一种一维的布局模型,给 flexbox 的子元素之间提供了强大的空间分布和对齐能力

### flex-direction

`主轴`

- `row(默认)`
- row-reverse
- column
- column-reverse

### flex-grow

用数值来定义扩展比率,不允许负数.`默认0`

### flex-shrink

用数值来定义收缩比率.不允许负值`默认1`

### flex-basis

设置或检索弹性盒伸缩基准值.如果所有子元素的基准值之和大于剩余空间,则会根据每项设置的基准值,按比率伸缩剩余空间

- length: 用长度值来定义宽度.不允许负值
- percentage: 用百分比来定义宽度.不允许负值
- auto: 无特定宽度值,取决于其它属性值`默认`
- content: 基于内容自动计算宽度
- 应用准则: content –> width –> flex-basis (limit by max|min-width)

### flex-wrap

- `nowrap默认`
- wrap
- wrap-reverse

### justify-content

设置或检索弹性盒子元素在主轴方向上的对齐方式

- `flex-start默认`
- flex-end
- center
- space-between
- space-around

### align-items

定义 flex 子项在 flex 容器的当前行的侧轴方向上的对齐方式

- flex-start
- flex-end
- center
- baseline
- stretch: `默认`.如果指定侧轴大小的属性值为 auto,则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸,但同时会遵照 min/max-width/height 属性的限制

### order

定义`flex子项`順序

- 用整数值来定义排列顺序,数值小的排在前面.可以为负值

### align-self

定义`flex子项`单独在侧轴方向上的对齐方式

- `auto默认`
- flex-start
- flex-end
- center
- baseline
- stretch
