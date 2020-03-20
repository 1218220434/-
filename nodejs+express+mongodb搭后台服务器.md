# nodejs+express+mongodb搭后台服务器

## 1.下载express ，看文档

首先去**[nodejs官网](http://nodejs.cn/)**下好nodejs，然后装npm，然后可以查看**[Express官方文档](https://www.expressjs.com.cn/)**，然后打开控制台执行这些指令就可以将依赖装好

> cd desktop   //回到桌面
>
> md express-test  //新建express-test文件夹
>
> cd express-test  //进入该文件夹
>
> npm install express --save  //装express 框架
>
> code .   //打开代码编辑器

## 2.搭建express框架

开始编写代码，在根目录创建app.js，然后写

>  **const** express=require('express')   //代表引入express框架，这是用到的CommonJS规范
>
>  **const** app=express()   //代表引用
>
>  app.use(express.json())   //开启数据解析
>
>  app.listen(4000,()**=>**{
>
>  console.log('app listening on port 4000!')
>
>  });  监听4000端口，我任意修改端口，此时可以访问http://localhost:4000了
>
>  
>
>  app.get('/',**function**(req,res){
>
>  res.send( {name:'hcl',age:1})
>
>  })     //给个路由，这样就可以返回一个对象
>
>  如果有静态文件存在xxName文件夹，就加一个，比如xxName文件夹下面有一个index.html,就可以这样写代码
>
>  app.use(express.static('xxName'))  //完事，这样访问http://localhost:4000/index.html
>
>  app.use('/static',express.static('public'))  //也可以这样访问http://localhost:4000/static/index.html
>
>  npm i cors  //引入跨域包
>
>  app.use(require('cors')())  //允许跨域
>

### 附：一定要装nodemon，不然每次改了代码容易忘记node app.js就很容易出错；

> 首先回到桌面  cd desktop
>
> 然后全局安装npm install -g nodemon，这样以后随便在哪个服务器都可用nodemon指令开启服务器了比如我这个服务器就直接nodemon  server 就可以热重载了，保存之后自动更新，安装的时候报错的话，参照：https://www.cnblogs.com/xiaofenguo/p/11511789.html
>
> 也可以看看视频：https://www.bilibili.com/video/av50776978

## 3.安装mongodb

> 从官网下实在是下不动，所以我找了个在线资源。
>
> 我的百度网盘：
>
> 链接: https://pan.baidu.com/s/1-w4rq_ni98yIX57CHv8V-w 
>
> 提取码: a8u3 
>
> 下载好之后开始安装，参照这个教程走：https://www.runoob.com/mongodb/mongodb-window-install.html
>
> 注意：执行完下面这一步，就代表这个数据库装好了，后面的都不用管了
>
> ![image-20200320183436513](C:\Users\何昌龙\AppData\Roaming\Typora\typora-user-images\image-20200320183436513.png)
>
> 然后去浏览器输入http://localhost:27017/  ，出现下面这句就成功了，就可以开始写代码了
>
> ```markdown
> It looks like you are trying to access MongoDB over HTTP on the native driver port.
> ```

## 4.搭建mongodb连接及用法

> npm i mongoose   //引入mongoose包
>
> **const** mongoose = require('mongoose')
>
> 
>
> mongoose.connect('mongodb://localhost:27017/express-test',{
>
>   useNewUrlParser:true,
>
>   useUnifiedTopology: true
>
> })     //建立连接
>
> 
>
> Product.insertMany([
>
>   {title:"产品1"},
>
>   {title:"产品2"},
>
>   {title:"产品3"},
>
> ])    //插入一组数据
>

## 5.get查询方式

> app.get('/product', **async** **function** (req, res) {
>
> **const** data = await Product.find().skip(1).limit(2)    //适用于分页，skip用于跳过第几条数据，limit用于显示返回几条数据
>
> **const** data = await Product.find().where({ title: '产品2' })    //where用于直接筛选查询字段
>
> **const** data = await Product.find().sort({_id:-1})  //sort用于逆序返回的数据，-1为逆序，1为正序
>
> **const** data = await Product.find()    //全部返回
>
> res.send(data)
>
> })

## 6.post 增加方式

>app.post('/products',**async** **function** (req,res){
>
>  **const** data=req.body  // 接受req
>
>  **const** product= await Product.create(data)    //将data插入mongodb数据库中。
>
>  res.send(product)   //返回插入的数据  ，此时已经插入完成了，可以查询出增加了数据
>
>})
>

> //拓展 在vscode下一个叫rest client的插件就可以在vscode里面调接口了。新建  .http后缀的文件，编写如下代码，然后点击vscode中自动出现的Send Request就可以内置访问接口了
>
> @URL=http://localhost:4000/
>
> 
>
> GET {{URL}}products
>
> 
>
> *###*
>
> POST {{URL}}products
>
> Content-Type: application/json
>
> 
>
> {
>
> "title":"产品4"
>
> }

## 7.修改和删除方法后面再说

> 下面是原版教学视频：
>
> https://space.bilibili.com/341919508/video
>
> ![image-20200320183952573](C:\Users\何昌龙\AppData\Roaming\Typora\typora-user-images\image-20200320183952573.png)
>
> 当然还有下一页那个第一节也要看，那个讲引入express的。

