## TypeScript知识点

编译成js文件

```node
tsc Test.ts
```

同时编译多个 ts 文件

```
tsc file1.ts file2.ts file3.ts
```

TypeScript 面向对象编程实例：

```typescript
class Site { 
   name():void { 
      console.log("Runoob") 
   } 
} 
var obj = new Site(); 
obj.name();
```

以上实例定义了一个类 Site，该类有一个方法 name()，该方法在终端上输出字符串 Runoob。

new 关键字创建类的对象，该对象调用方法 name()。

编译后生成的 JavaScript 代码如下：

```javascript
var Site = /** @class */ (function () {    
    function Site() {    }    
    Site.prototype.name = function () {  
        console.log("Runoob");   
    };   
    return Site; 
}()); 
var obj = new Site();
obj.name();
```

