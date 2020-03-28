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