---
title: dom
order: 2
---

## 概念

- 是生成页面的基础数据结构
- 提供给 js 脚本操作接口

## 节点基本

- 文档本身是文档节点
- 所有 HTML 元素是元素节点
- 所有 HTML 属性是属性节点
- HTML 元素内的文本是文本节点(包括回车符也是属于文本节点)
- 注释是注释节点
- 文本节点 type 为 3,元素节点 type 为 1

## 节点属性

- nodeType
- nodeName
- nodeValue: element 返回 null,textElement 返回空
- ownerElement: 返回#document
- childNodes: 返回的是 NodeList 数组,是属于节点(也包括元素)的属性
- parentNode

## 元素节点

- previousElementSibling
- nextElementSibling
- firstElementChild
- lastElementChild
- children: 返回的是子元素,是属于元素的属性
- parentElement === parentNode

## 结点操作

- document.createElement(tagName): 创建一个对象并且返回它
- parentElement.appendChild(node): 将 node 添加到父级的最后,返回这个 node
- parentElement.insertBefore(node，positionNode): 在位置前添加 node,返回着个 node
- parentElement.removeChild(node): 移出 node,返回被移除的 node
- parentElement.replaceChild(newNode，replaceNode): 用 newNode 在替换 replaceNode,返回 replaceNode
- node.cloneNode(true): 克隆该 node 和它 children .返回这个克隆出来的对象,不会添加到 dom 树

## 属性操作

- setAttribute(key, value)
- removeAttribute(key, value)
- getAttribute(key)
- innerHTML: 包含标签的解析
- innerText: 文本
  - 只展示给人看的元素
  - 受 CSS 样式的影响，并且不会返回隐藏元素的文本
  - 触发 reflow
- textContent: 文本
  - 会获取所有元素的内容，包括 <script> 和 <style> 元素
  - 会返回节点中的每一个元素
- dataset.property(getter, setter)

## 元素宽高

- border-box: element.offsetWidth / element.offsetHeight
- padding-box: element.clientWidth / element.clientHeight
- padding-box + scroll: element.scrollWidth / element.scrollHeight
- border: element.clientLeft / element.clientTop

## 元素偏移

- 几何位置(视口坐标): element.getBoundingClientRect()
- 文档滚动距离: window.pageXOffset / window.pageYOffset
- 父级第一个有定位: element.offsetLeft / element.offsetTop
- 滚动条: scrollLeft / scrollTop
- 事件坐标
  - 视口: e.clientX / e.clientY
  - 文档: e.pageX / e.pageY
  - 事件源(padding): e.offsetX / e.offsetY

## 事件

### EventTarget

- EventTarget.addEventListener(event, function, useCapture)
  - true: 在捕获阶段执行
  - false(默认): 在冒泡阶段执行
- EventTarget.removeEventListener(event, function)
- EventTarget.dispatchEvent(Event, target): 调用 Event.preventDefault()，则返回值为 false；否则返回 true
- Event(type, options)
  - bubbles: 可选，Boolean 类型，默认值为 false
  - cancelable: 可选，Boolean 类型，默认值为 false
  - composed: 可选，Boolean 类型，默认值为 false，指示事件是否会在影子 DOM 根节点之外触发侦听器
- CustomEvent(type, customEventInit)
  - detail: 可选的默认值是 null 的任意类型数据，是一个与 event 相关的值
  - bubbles: 一个布尔值，表示该事件能否冒泡。默认不冒泡
  - cancelable: 一个布尔值，表示该事件是否可以取消

### 事件对象

- metaKey
- e.key
- `e.keyCode`
- e.ctrlKey
- e.shiftKey
- e.altKey
- bubbles: 是否冒泡
- cancelable: 是否可以取消事件的默认行为
- `target`: 触发事件 node
- `currentTarget`: 事件绑定 node
- `preventDefault()`
- `stopImmediatePropagation()`: 取消事件的进一步捕获或冒泡，同时阻止任何处理程序被调用
- `stopPropagation()`: 阻止冒泡
- type: 触发事件的类型

### 加载事件

- onload
- onunload: 卸载
- onbeforeunload: 事件在即将离开当前页面(刷新或关闭)

### 鼠标事件

- onclick(冒泡)
- ondblclick(冒泡)
- oncontextmenu(冒泡)
- onmouseover(冒泡)
- onmousedown(冒泡)
- onmouseup(冒泡)
- onmouseout(冒泡)
- onmouseenter(不冒泡)
- onmouseleave(不冒泡)
- onwheel(冒泡)

### 键盘事件

- onkeydown(冒泡): 可获取功能键，不区分大小写
- onkeypress(冒泡): 不可获取功能键，区分大小写
- onkeyup(冒泡): 可获取功能键，不区分大小写

## RAF

- requestAnimationFrame(callback) => number
- cancelAnimationFrame(id) => void
- requestIdleCallback(callback, options) => number
  - 插入一个函数，这个函数将在浏览器空闲时期被调用
  - options 只有 timeout.如果指定了 timeout，并且有一个正值，而回调在 timeout 毫秒过后还没有被调用，那么回调任务将放入事件循环中排队
- cancelIdleCallback(id)

## 样式

- getComputedStyle(element) => CSSStyleDeclaration
- element.style => CSSStyleDeclaration
- element.style 读取的只是元素的内联样式，即写在元素的 style 属性上的样式
- element.style 既支持读也支持写，我们通过 element.style 即可改写元素的样式
- getComputedStyle 读取的样式是最终样式，包括了内联样式、嵌入样式和外部样式
- getComputedStyle 仅支持读并不支持写入
