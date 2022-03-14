---
title: css
order: 1
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
  - alternate: 动画先正常运行再反方向运行，并持续交替运行
  - alternate-reverse: 动画先反运行再正方向运行，并持续交替运行
- animation-fill-mode: 检索或设置对象动画时间之外的状态
  - none: `默认`。不设置对象动画之外的状态
  - forwards: 设置对象状态为动画结束时的状态
  - backwards: 设置对象状态为动画开始时的状态
  - both: 设置对象状态为动画结束或开始的状态
- animation-play-state: 检索或设置对象动画的状态
  - running: `默认`
  - paused

## 浮动元素

浮动元素同时处于常规流内和流外的元素。其中块级元素认为浮动元素不存在，而浮动元素会影响行内元素的布局

## 行内元素

span、a、label、i、strong、b

- 行内元素不会独占一行，相邻的行内元素会排列在同一行里，直到一行排不下，才会换行，其宽度随元素的内容而变化
- 行内元素设置 width, height
- 行内元素只能设置水平 margin 和 padding

## 块级元素

div、p、li、h1、h2、h3、h4

- 块级元素会独占一行，其宽度自动填满其父元素宽度
- 可以设置 width, height 属性
- 块级元素可以设置 margin 和 padding

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

块级格式化上下文,它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用

### 触发 BFC

- 根元素或其它包含它的元素
- 浮动 float: left/right/inherit
- 绝对定位元素 position: absolute/fixed
- 行内块 display: inline-block
- 表格单元格 display: table-cell
- 表格标题 display: table-caption
- 溢出元素 overflow: hidden/scroll/auto/inherit
- 弹性盒子 display: flex/inline-flex

### BFC 特性

- 内部的 Box 会在垂直方向，一个接一个地放置
- Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- 每个元素的 margin box 的左边， 与包含块 border box 的左边相接触。即使存在浮动也是如此
- BFC 的区域不会与 float box 重叠
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
- 计算 BFC 的高度时，浮动元素也参与计算

### 应用

- 解决块级元素垂直方向 margin 重叠
- 解决高度塌陷问题
- 清除浮动

## IFC

行内级格式化上下文

### 如何触发

块级元素中仅包含内联级别元素.当 IFC 中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个 IFC

### 布局规则

- 在一个 IFC 内，子元素是水平方向横向排列的，并且垂直方向起点为元素顶部
- 子元素只会计算横向样式空间(padding、border、margin)，垂直方向样式空间不会被计算
- 在垂直方向上，子元素会以不同形式来对齐(vertical-align)
- 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块和与其中的浮动来决定
- IFC 中的 line box 一般左右边贴紧其包含块，但 float 元素会优先排列
- IFC 中的 line box 高度由 CSS 行高计算规则来确定，同个 IFC 下的多个 line box 高度可能会不同
- 当 inline boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 text-align 属性值来决定
- 当一个 inline box 超过父元素的宽度时，它会被分割成多个 boxes，这些 boxes 分布在多个 line box 中。如果子元素未设置强制换行的情况下，inline box 将不可被分割，将会溢出父元素

### 应用

- 元素水平居中
- 多行文本水平垂直居中

## 层叠上下文

HTML 中的一个三维的概念

### 层叠水平

- 普通元素的层叠水平优先由层叠上下文决定，因此，层叠水平的比较只有在当前层叠上下文元素中才有意义
- 不要把层叠水平和 CSS 的 z-index 属性混为一谈。某些情况下 z-index 确实可以影响层叠水平，但是，只限于定位元素以及 flex 盒子的孩子元素；而层叠水平所有的元素都存在

### 层叠顺序

表示元素发生层叠时候有着特定的垂直显示顺序.规则

- 层叠上下文(background/border)
- 负 z-index
- block 块状水平盒子
- float 浮动盒子
- inline/inline-block 水平盒子
- z-index: auto(0)
- 正 z-index

### 层叠准则

- 谁大谁上
- 后来居上

### 层叠上下文创建

- 页面根元素天生具有层叠上下文
- z-index 值为数值的定位元素的传统层叠上下文(position:relative/position:absolute)
- 其他 CSS3 属性
  - `z-index值不为auto的flex项(父元素display:flex|inline-flex)`
  - `元素的opacity值不是1`
  - `元素的transform值不是none`
  - 元素 mix-blend-mode 值不是 normal.
  - 元素的 filter 值不是 none.
  - 元素的 isolation 值是 isolate.
  - will-change 指定的属性值为上面任意一个。
  - 元素的-webkit-overflow-scrolling 设为 touch

### 特性

- 层叠上下文的层叠水平要比普通元素高
- 层叠上下文可以阻断元素的混合模式
- 层叠上下文可以嵌套，内部层叠上下文及其所有子元素均受制于外部的层叠上下文
- 每个层叠上下文和兄弟元素独立，也就是当进行层叠变化或渲染的时候，只需要考虑后代元素
- 每个层叠上下文是自成体系的，当元素发生层叠的时候，整个元素被认为是在父层叠上下文的层叠顺序中

## 水平垂直居中

- flex 布局
- position + margin(已知宽高)

```css
.element {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

- position + transform(未知宽高)

```css
.element {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

## 性能优化

- 避免使用@import，外部的 css 文件中使用@import 会使得页面在加载时增加额外的延迟
- 避免过分重排
- css 动画启用 GPU 加速,css3 转换,css3d 变换
- 文件压缩
- 去除无用 CSS
- 有选择地使用选择器(从右往左匹配)
  - 保持简单，不要使用嵌套过多过于复杂的选择器
  - 通配符和属性选择器效率最低，需要匹配的元素最多，尽量避免使用。
  - 不要使用类选择器和 ID 选择器修饰元素标签
- 减少使用昂贵的属性
  - box-shadow
  - border-radius
  - filter
  - opacity
  - :nth-child(n)
