---
title: 重要概念
order: 4
---

## box

- 概念: 包含了元素 content、padding、border、margin 几个要素
- 标准模型: 元素宽度 width = content(height 同)
- IE 模型: 元素宽度 width = border + content + padding(height 同)

## 浮动元素

浮动元素同时处于常规流内和流外的元素.其中块级元素认为浮动元素不存在,而浮动元素会影响行内元素的布局

## 行内元素

span、a、label、i、strong、b

- 行内元素不会独占一行,相邻的行内元素会排列在同一行里,直到一行排不下,才会换行,其宽度随元素的内容而变化
- 行内元素只能设置水平 margin 和 padding

## 块级元素

div、p、li、h1、h2、h3、h4

- 块级元素会独占一行,其宽度自动填满其父元素宽度
- 可以设置 width, height 属性
- 块级元素可以设置 margin 和 padding

## 定位方案

- 普通流: 元素按照其在 HTML 中的先后位置至上而下从左到右依次排列布局,块级元素则会被渲染为完整的一个新行,`默认都是普通流定位`
- 浮动: 元素首先按照普通流的位置出现,然后根据浮动的方向尽可能的向左边或右边偏移
- 绝对定位: 元素会整体脱离普通流,不会对其兄弟元素造成影响,而元素具体的位置由绝对定位的坐标决定

## position

- static: 对象遵循常规流.此时 4 个定位偏移属性不会被应用
- relative: 对象遵循常规流,通过 top,right,bottom,left 进行偏移时不会影响常规流中的任何元素
- absolute: 对象脱离常规流,偏移属性参照的是离自身最近的定位祖先元素.不影响常规流中的任何元素
- fixed: 与 absolute 一致,但偏移定位是以窗口为参考

## BFC

块级格式化上下文,它决定了元素如何对其内容进行定位,以及与其它元素的关系和相互作用

### 触发 BFC

- 根元素或其它包含它的元素
- 浮动 float: left/right/inherit
- 绝对定位元素 position: absolute/fixed
- 行内块 display: inline-block
- 表格单元格 display: table-cell
- 表格标题 display: table-caption
- 溢出元素 overflow: hidden/scroll/auto/inherit

### BFC 特性

- 内部的 Box 会在垂直方向,一个接一个地放置
- Box 垂直方向的距离由 margin 决定.属于同一个 BFC 的两个相邻 Box 的 margin 会发生重叠
- 每个元素的 margin box 的左边, 与包含块 border box 的左边相接触.即使存在浮动也是如此
- BFC 的区域不会与 float box 重叠
- BFC 就是页面上的一个隔离的独立容器,容器里面的子元素不会影响到外面的元素
- 计算 BFC 的高度时,浮动元素也参与计算

### 应用

- 解决块级元素垂直方向 margin 重叠
- 解决高度塌陷问题
- 清除浮动

## IFC

行内级格式化上下文

### 如何触发

块级元素中仅包含内联级别元素.当 IFC 中有块级元素插入时,会产生两个匿名块将父元素分割开来,产生两个 IFC

### 布局规则

- 在一个 IFC 内,子元素是水平方向横向排列的,并且垂直方向起点为元素顶部
- 子元素只会计算横向样式空间(padding、border、margin),垂直方向样式空间不会被计算
- 在垂直方向上,子元素会以不同形式来对齐(vertical-align)
- 能把在一行上的框都完全包含进去的一个矩形区域,被称为该行的行框(line box).行框的宽度是由包含块和与其中的浮动来决定
- IFC 中的 line box 一般左右边贴紧其包含块,但 float 元素会优先排列
- IFC 中的 line box 高度由 CSS 行高计算规则来确定,同个 IFC 下的多个 line box 高度可能会不同
- 当 inline boxes 的总宽度少于包含它们的 line box 时,其水平渲染规则由 text-align 属性值来决定
- 当一个 inline box 超过父元素的宽度时,它会被分割成多个 boxes,这些 boxes 分布在多个 line box 中.如果子元素未设置强制换行的情况下,inline box 将不可被分割,将会溢出父元素

### 应用

- 元素水平居中
- 多行文本水平垂直居中

## 层叠上下文

HTML 中的一个三维的概念

### 层叠水平

- 普通元素的层叠水平优先由层叠上下文决定,因此,层叠水平的比较只有在当前层叠上下文元素中才有意义
- 不要把层叠水平和 CSS 的 z-index 属性混为一谈.某些情况下 z-index 确实可以影响层叠水平,但是,只限于定位元素以及 flex 盒子的孩子元素;而层叠水平所有的元素都存在

### 层叠顺序

表示元素发生层叠时候有着特定的垂直显示顺序规则

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
  - will-change 指定的属性值为上面任意一个.
  - 元素的-webkit-overflow-scrolling 设为 touch

### 特性

- 层叠上下文的层叠水平要比普通元素高
- 层叠上下文可以阻断元素的混合模式
- 层叠上下文可以嵌套,内部层叠上下文及其所有子元素均受制于外部的层叠上下文
- 每个层叠上下文和兄弟元素独立,也就是当进行层叠变化或渲染的时候,只需要考虑后代元素
- 每个层叠上下文是自成体系的,当元素发生层叠的时候,整个元素被认为是在父层叠上下文的层叠顺序中

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
