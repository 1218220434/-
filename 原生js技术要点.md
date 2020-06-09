# 原生js技术要点

## 1.检测数据类型四种方式

1.typeof不能具体的细分对象、数组、正则等,因为不管检测哪一个返回的都是"object"

``` 
typeof [12] =>"Object"
```

2.instanceof:检测当前实例是否属于某一个类,属于的话返回true,不属于返回false

```
var ary=[];
ary instanceof Array ->true
ary instanceof RegExp ->false
ary instanceof Object ->true 所有的对象都是Object这个基类的一个实例
```

3.constructor

```
var ary=[];
ary.constructor===Array ->true 说明ary是Array这个类的一个实例(constructor可以让用户自己来修改,所有我们一般不用这个来检测)
```

4.Object.prototype.toString

```
Object.prototype.toString.call(12) ->检测12的数据类型 ->"[object Number]"
Object.prototype.toString.call("zhufeng") ->"[object String]"
Object.prototype.toString.call(null) ->"[object Null]"
Object.prototype.toString.call(undefined) ->"[object Undefined]"
Object.prototype.toString.call([]) ->"[object Array]"
Object.prototype.toString.call(/^$/) ->"[object RegExp]"
Object.prototype.toString.call(function(){}) ->"[object Function]"
```

## 2.JSON

 [JSON](https://baike.baidu.com/item/JSON)([JavaScript](https://baike.baidu.com/item/JavaScript) Object Notation, JS 对象简谱) 是一种轻量级的数据交换格式

## 3.XML和HTML

**XML 被设计用来传输和存储数据。**

**HTML 被设计用来显示数据。**

## 4.ajax相关

ajax是一种异步请求数据的web开发技术，作用是能够异步请求数据并完成刷新页面，原理是结合XMLHttpRequest对象，想服务器发起请求，服务器响应后，返回数据后前端异步刷新页面

## 5.const， var， let 的区别

const定义的·变量不可修改，必须初始化

var定义的变量可以修改，如果不初始化会输出undefined，不会报错

let是ES6提出的用以处理块级作用域的声明方式，在函数内部使用let声明后，对函数外部无影响

## 6.`async` 和 `defer`

浏览器遇到 `async` 脚本时不会阻塞页面渲染，而是直接下载然后运行。这样脚本的运行次序就无法控制，只是脚本不会阻止剩余页面的显示。当页面的脚本之间彼此独立，且不依赖于本页面的其它任何脚本时，`async` 是最理想的选择。

比如，如果你的页面要加载以下三个脚本：

```html
<script async src="js/vendor/jquery.js"></script>

<script async src="js/script2.js"></script>

<script async src="js/script3.js"></script>
```

三者的调用顺序是不确定的。`jquery.js` 可能在 `script2` 和 `script3` 之前或之后调用，如果这样，后两个脚本中依赖 `jquery` 的函数将产生错误，因为脚本运行时 `jquery` 尚未加载。

解决这一问题可使用 `defer` 属性，脚本将按照在页面中出现的顺序加载和运行：

```html
<script defer src="js/vendor/jquery.js"></script>

<script defer src="js/script2.js"></script>

<script defer src="js/script3.js"></script>
```

添加 `defer` 属性的脚本将按照在页面中出现的顺序加载，因此第二个示例可确保 `jquery.js` 必定加载于 `script2.js` 和 `script3.js` 之前，同时 `script2.js` 必定加载于 `script3.js` 之前。

脚本调用策略小结：

- 如果脚本无需等待页面解析，且无依赖独立运行，那么应使用 `async`。
- 如果脚本无需等待页面解析，且依赖于其它脚本，调用这些脚本时应使用 `defer`，将关联的脚本按所需顺序置于 HTML 中。

## 禁止弹出层弹出后底层的滑动

可以给html和body标签加类 不过最好的方式阻止事件冒泡，就可以禁止底层滑动。

```javascript
    .noscroll {
            height: 100%;
            overflow: hidden;
        }
    document.querySelector('button').onclick = (e) => {
            document.querySelector('.alert').classList.add("block"); //展示弹出层。
            // document.querySelector('html').classList.add('noscroll')
            // document.querySelector('body').classList.add('noscroll')
            e.preventDefault();
        }
```

