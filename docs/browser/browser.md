---
title: browser
order: 4
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

## 跨页面通信

### url

### localStorage

### message

```js
window.addEventListener('message', function (event) {
  //event.source: 消息源，消息的发送窗口/iframe
  //event.origin: 消息源的 URI(可能包含协议、域名和端口)，用来验证数据源。
  //event.data: 发送过来的数据
});
```

### postMessage

otherWindow.postMessage(message, targetOrigin, [transfer]);

- otherWindow: 其他窗口的一个引用，比如 iframe 的 contentWindow 属性、执行 window.open 返回的窗口对象、或者是命名过或数值索引的 window.frames
- `message`: 数据
- `targetOrigin`: 指定哪些窗口能接收到消息事件，其值可以是 \*（表示无限制）或者一个 URI。

### iframe

能自由操作 iframe 和父框架的内容(DOM)的前提条件是同域

- `height / width`
- `marginheight`: 顶部和底部的空白边距.`marginwidth`
- `name`: 用于在 js 中引用元素，或者作为链接的目标
- scrolling
  - auto: 在需要的情况下出现滚动条.`默认`
  - yes: 始终显示滚动条(即使不需要) no: 从不显示滚动条(即使需要)
- `src`
- `iframe.contentWindow`: 获取 iframe 的 window 对象
- `iframe.contentDocument`: 获取 iframe 的 document 对象
- `window.parent`: 获取上一级的 window 对象，如果还是 iframe 则是该 iframe 的 window 对象
- `window.top`: 获取最顶级容器的 window 对象，即打开页面的文档
- `window.self`: 返回自身 window 的引用，可以理解为 window===window.self

## 前端路由

### hash

- hash 指的是地址中#号以及后面的字符，也称为散列值。hash 也称作锚点，本身是用来做页面跳转定位的
- 散列值是不会随请求发送到服务器端的，所以改变 hash，不会重新加载页面
- 监听 window 的 hashchange 事件，当散列值改变时，可以通过 location.hash 来获取和设置 hash 值
- location.hash 值的变化会直接反应到浏览器地址栏

### 触发 hashchange

- 浏览器地址栏散列值的变化(包括浏览器的`前进`、`后退`)
- 当浏览器地址栏输入 url 带有 hash 且搜索
- 当只改变浏览器地址栏 URL 的哈希部分，这时按下回车
- 通过 a 标签跳转到对应锚点

### history 概述

- window.history: 指向 History 对象，表示当前窗口的浏览历史
- History: 保存了当前窗口访问过的所有页面网址
- 浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作

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

## DOM

### 概念

- 是生成页面的基础数据结构
- 提供给 js 脚本操作接口

### 如何生成

- 通过分词器将字节流转换为 Token
  - `Tag Token`: `StartTag`和 `EndTag`
  - `文本 Token`
- 将 Token 解析为 DOM 节点，并将 DOM 节点添加到 DOM 树中(`栈结构`)
  - 如果压入到栈中的是 StartTag Token，HTML 解析器会为该 Token 创建一个 DOM 节点，然后将该节点加入到 DOM 树中，它的父节点就是栈中相邻的那个元素生成的节点
  - 如果分词器解析出来是文本 Token，那么会生成一个文本节点，然后将该节点加入到 DOM 树中，文本 Token 是不需要压入到栈中，它的父节点就是当前栈顶 Token 所对应的 DOM 节点
  - 如果分词器解析出来的是 EndTag 标签，比如是 EndTag div，HTML 解析器会查看 Token 栈顶的元素是否是 StarTag div，如果是，就将 StartTag div 从栈中弹出，表示该 div 元素解析完成
- js 脚本 会阻塞 DOM 生成，而样式文件又会阻塞 js 脚本执行

### defer / async

![](../assets/browser/scriptType.png)

- defer: 遇到 defer 的脚本，在后台进行下载，不会阻止文档渲染，当页面解析&渲染完毕后。会等到所有的 defer 脚本加载完毕并按照顺序执行，执行完毕后会触发 DOMContentLoaded 事件 ![](../assets/browser/deferScript.png)
- async: 脚本会在加载完毕后执行。async 脚本的加载不计入 DOMContentLoaded ![](../assets/browser/asyncScript.png)
