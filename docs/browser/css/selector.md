---
title: selector
order: 1
---

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

### css 优先级

!important > 行内(1000) > id(100) > class(10) > tag(1)

- 内联样式和外联样式的优先级和加载顺序有关
- 如果!important 被用于一个简写的样式属性,那么这条简写的样式属性所代表的子属性都会被应用上!important
- 如果两条样式都使用!important,则权重值高的优先级更高
- 在 css 样式表中,同一个 CSS 样式你写了两次,后面的会覆盖前面的
- 样式指向同一元素,权重规则生效,权重大的被应用
- 样式指向同一元素,权重规则生效,权重相同时,就近原则生效,后面定义的被应用

```html
<style>
  /* 权重值:201 */
  #box #box2 p {
    width: 200px;
    height: 200px;
    background-color: red;
  }
  /* 权重值:201,离目标最近 */
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

- 样式不指向同一元素时,权重规则失效,就近原则生效,离目标元素最近的样式被应用
