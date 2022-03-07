---
title: base
order: 1
nav:
  title: css
  order: 3
---

## box

- 概念: 包含了元素 content、padding、border、margin 几个要素
- 标准模型: 元素宽度 width = content(height 同)
- IE 模型: 元素宽度 width = border + content + padding(height 同)

## 选择器

### 元素选择符

- 通配符
- `类型`
- `id`
- `class`

### 关系选择符

- `包含选择符(E F)`
- `子选择符(E > F)`
- 相邻选择符(E + F)
- 兄弟选择符(E ~ F)

### 属性选择符

- `E[att]`
- `E[att="val"]`
- E[att~="val"]
- `E[att^="val"]`
- `E[att$="val"]`
- `E[att*="val"]`
- E[att|="val"]

### 伪类选择符

- `E:link`
- `E:visited`
- `E:hover`
- `E:active`
- `E:first-child`
- `E:last-child`
- `E:nth-child(n)`
- `E:nth-last-child(n)`
- `E:first-of-type`
- `E:last-of-type`
- `E:nth-of-type(n)`
- `E:nth-last-of-type(n)`
- `E:focus`
- `E:not(rules)`
- `E:checked`
- `E:enabled`
- `E:disabled`
- `E:target`

### 伪对象选择符

- E::first-letter
- E::first-line
- E::before
- E::after
- E::placeholder
- E::selection

## css 优先级

!important > 行内(1000) > id(100) > class(10) > tag(1)

- 内联样式和外联样式的优先级和加载顺序有关
- 如果!important 被用于一个简写的样式属性，那么这条简写的样式属性所代表的子属性都会被应用上!important
- 如果两条样式都使用!important，则权重值高的优先级更高
- 在 css 样式表中，同一个 CSS 样式你写了两次，后面的会覆盖前面的
- 样式指向同一元素，权重规则生效，权重大的被应用
- 样式指向同一元素，权重规则生效，权重相同时，就近原则生效，后面定义的被应用

```html
<style>
  /* 权重值：201 */
  #box #box2 p {
    width: 200px;
    height: 200px;
    background-color: red;
  }
  /* 权重值：201,离目标最近 */
  #box #box3 p {
    width: 200px;
    height: 200px;
    background-color: yellow;
  }
</style>
<div id="box">
  <div id="box2">
    <div id="box3">
      <p>111</p>
    </div>
  </div>
</div>
```

- 样式不指向同一元素时，权重规则失效，就近原则生效，离目标元素最近的样式被应用

## BFC

### 定位方案

- 普通流: 元素按照其在 HTML 中的先后位置至上而下从左到右依次排列布局，块级元素则会被渲染为完整的一个新行，`默认都是普通流定位`
- 浮动: 元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移
- 绝对定位: 元素会整体脱离普通流，不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定

### position

- static: 对象遵循常规流。此时 4 个定位偏移属性不会被应用
- relative: 对象遵循常规流，通过 top，right，bottom，left 进行偏移时不会影响常规流中的任何元素
- absolute: 对象脱离常规流，偏移属性参照的是离自身最近的定位祖先元素。不影响常规流中的任何元素
- fixed: 与 absolute 一致，但偏移定位是以窗口为参考

### FC

Formatting context(格式化上下文).一块渲染区域，且有一套渲染规则，它决定子元素如何定位，以及和其他元素的关系和相互作用

### BFC

块级格式化上下文,属于普通流.`具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性`

### 触发 BFC

- body 根元素
- 浮动元素: float !== none
- 绝对定位元素：position(absolute、fixed)
- display(inline-block、table-cells、flex)
- overflow(hidden、auto、scroll)

### BFC 特性及应用

- 同一个 BFC 下外边距会发生折叠
- BFC 可以包含浮动的元素（清除浮动）
- BFC 可以阻止元素被浮动元素覆盖

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

设置或检索弹性盒伸缩基准值.如果所有子元素的基准值之和大于剩余空间，则会根据每项设置的基准值，按比率伸缩剩余空间

- length: 用长度值来定义宽度。不允许负值
- percentage: 用百分比来定义宽度。不允许负值
- auto: 无特定宽度值，取决于其它属性值`默认`
- content: 基于内容自动计算宽度
- 应用准则: content –> width –> flex-basis (limit by max|min-width)

### flex-wrap

- `nowrap默认`
- wrap
- wrap-reverse

### justify-content

设置或检索弹性盒子元素在主轴方向上的对齐方式

- `lex-start默认`
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
- stretch: `默认`.如果指定侧轴大小的属性值为 auto，则其值会使项目的边距盒的尺寸尽可能接近所在行的尺寸，但同时会遵照 min/max-width/height 属性的限制

### order

定义`flex子项`順序

- 用整数值来定义排列顺序，数值小的排在前面。可以为负值

### align-self

定义`flex子项`单独在侧轴方向上的对齐方式

- `auto默认`
- flex-start
- flex-end
- center
- baseline
- stretch
