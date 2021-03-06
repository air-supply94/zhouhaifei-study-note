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
- parentElement.insertBefore(node,positionNode): 在位置前添加 node,返回这个 node
- parentElement.removeChild(node): 移出 node,返回被移除的 node
- parentElement.replaceChild(newNode,replaceNode): 用 newNode 在替换 replaceNode,返回 replaceNode
- node.cloneNode(true): 克隆该 node 和它 children .返回这个克隆出来的对象,不会添加到 dom 树

## 属性操作

- setAttribute(key, value)
- removeAttribute(key)
- getAttribute(key)
- innerHTML: 包含标签的解析
- innerText: 文本
  - 不返回 display:none 的元素
  - 获取所有元素的内容,不包括 \<script> 和 \<style> 元素
  - 会根据标签里面的元素独立一行
  - 触发 reflow
- textContent: 文本
  - 会返回 display:none 的元素
  - 会获取所有元素的内容,包括 \<script> 和 \<style> 元素
  - 不会理会 html 格式,直接输出不换行的文本
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

## 事件

### EventTarget

- EventTarget.addEventListener(event, function, useCapture)
  - true: 在捕获阶段执行
  - false(默认): 在冒泡阶段执行
- EventTarget.removeEventListener(event, function)
- EventTarget.dispatchEvent(Event): 调用 Event.preventDefault(),则返回值为 false;否则返回 true
- Event(type, options)
  - bubbles: 可选,Boolean 类型,默认值为 false
  - cancelable: 可选,Boolean 类型,默认值为 false
  - composed: 可选,Boolean 类型,默认值为 false,指示事件是否会在影子 DOM 根节点之外触发侦听器
- CustomEvent(type, customEventInit)
  - detail: 可选的默认值是 null 的任意类型数据,是一个与 event 相关的值
  - bubbles: 一个布尔值,表示该事件能否冒泡.默认不冒泡
  - cancelable: 一个布尔值,表示该事件是否可以取消

### 事件对象

- metaKey
- e.key
- `e.keyCode`
- `e.clientX`和`e.clientY`
- `e.pageX`和`e.pageY`
- `e.offsetX`和`e.offsetY`.事件源(padding)

- e.ctrlKey
- e.shiftKey
- e.altKey
- bubbles: 是否冒泡
- cancelable: 是否可以取消事件的默认行为
- `target`: 触发事件 node
- `currentTarget`: 事件绑定 node
- `preventDefault()`
- `stopImmediatePropagation()`: 阻止事件冒泡并且阻止该元素上同事件类型的监听器被触发
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

- onkeydown(冒泡): 可获取功能键,不区分大小写
- onkeypress(冒泡): 不可获取功能键,区分大小写
- onkeyup(冒泡): 可获取功能键,不区分大小写

## RAF

- requestAnimationFrame(callback) => number
- cancelAnimationFrame(id) => void
- requestIdleCallback(callback, options) => number
  - 插入一个函数,这个函数将在浏览器空闲时期被调用
  - options 只有 timeout.如果指定了 timeout,并且有一个正值,而回调在 timeout 毫秒过后还没有被调用,那么回调任务将放入事件循环中排队
- cancelIdleCallback(id)

## 样式

- getComputedStyle(element) => CSSStyleDeclaration
- element.style => CSSStyleDeclaration
- element.style 读取的只是元素的内联样式,即写在元素的 style 属性上的样式
- element.style 既支持读也支持写,我们通过 element.style 即可改写元素的样式
- getComputedStyle 读取的样式是最终样式,包括了内联样式、嵌入样式和外部样式
- getComputedStyle 仅支持读并不支持写入

## 前端路由

### hash

- hash 指的是地址中#号以及后面的字符,也称为散列值.hash 也称作锚点,本身是用来做页面跳转定位的
- 散列值是不会随请求发送到服务器端的,所以改变 hash,不会重新加载页面
- 监听 window 的 hashchange 事件,当散列值改变时,可以通过 location.hash 来获取和设置 hash 值
- location.hash 值的变化会直接反应到浏览器地址栏

### 触发 hashchange

- 浏览器地址栏散列值的变化(包括浏览器的`前进`、`后退`)
- 当浏览器地址栏输入 url 带有 hash 且搜索
- 当只改变浏览器地址栏 URL 的哈希部分,这时按下回车
- 通过 a 标签跳转到对应锚点

### history 概述

- window.history: 指向 History 对象,表示当前窗口的浏览历史
- History: 保存了当前窗口访问过的所有页面网址
- 浏览器工具栏的"前进"和"后退"按钮,其实就是对 History 对象进行操作

### history 属性

- length
- state: 堆栈最上层的状态值
- back()
- forward()
- go()
- pushState(state, '', url): 在历史中添加一条记录,不会触发页面刷新
- replaceState(state, '', url)

### popstate

- 仅调用 pushState()或 replaceState(),并不会触发该事件
- 只有用户点击浏览器倒退按钮和前进按钮,back(),forward(),go()才会触发
