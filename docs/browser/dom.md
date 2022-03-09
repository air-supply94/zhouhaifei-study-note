---
title: dom
order: 2
---

## 浏览器渲染

![](../assets/browser/browerRender.png)

- DOM Tree: HTML 解析成树形的数据结构
- CSS Rule Tree: CSS 解析成树形的数据结构
- Render Tree: DOM 和 CSSOM 合并后生成 Render Tree
- layout: 有了 Render Tree，浏览器已经能知道网页中有哪些节点、各个节点的 CSS 定义以及他们的从属关系，从而去计算出每个节点在屏幕中的位置
- painting: 按照算出来的规则，通过显卡，把内容画到屏幕上
- reflow: 当浏览器发现某个部分发生了点变化影响了布局，需要倒回去重新渲染
- repaint: 改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分要重画，但是元素的几何尺寸没有变
- 注意点
  - display:none 的节点不会被加入 Render Tree，而 visibility: hidden 则会
  - display:none 会触发 reflow，而 visibility:hidden 只会触发 repaint
  - 有些情况下，比如修改了元素的样式，浏览器并不会立刻 reflow 或 repaint 一次，而是会把这样的操作积攒一批，然后做一次 reflow

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

### dom2 级

- addEventListener(event, function, useCapture)
  - true: 在捕获阶段执行
  - false(默认): 在冒泡阶段执行
- removeEventListener(event, function)

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

## defer / async

![](../assets/browser/scriptType.png)

- defer: 遇到 defer 的脚本，在后台进行下载，不会阻止文档渲染，当页面解析&渲染完毕后。会等到所有的 defer 脚本加载完毕并按照顺序执行，执行完毕后会触发 DOMContentLoaded 事件 ![](../assets/browser/deferScript.png)
- async: 脚本会在加载完毕后执行。async 脚本的加载不计入 DOMContentLoaded ![](../assets/browser/asyncScript.png)
