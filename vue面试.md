# vue框架搭建
首先装好nodejs，npm，vue-cli，然后执行vuecreate命令创建项目，
创建过程中勾选一些预装的模块，
比如axios，vue-router，less等等，
然后cd到项目里面，装项目需要的ui库，插件和工具等等，
然后配置路由，进行开发


# vue编程式导航的原理，
可以通过 $router 访问路由实例
可以通过router.replace、router.push、router.go做编程式跳转。

# 计算属性和侦听属性的区别，
当有一些数据需要随着其它数据变动而变动时，
通常更好的做法是使用计算属性computed而不是命令式的 watch 回调
（一个数据受其他数据影响时）
当一个数据变化而需要执行异步或开销较大的操作时，侦听器watch 更加适用
（侦听一个数据，改变其他数据）
而一般的事件绑定，普通函数，请求数据方法都是在methods中处理。
然后vue的生命周期函数就是在相应时机调用这些定义好的函数。

# vue如果要进行dom操作有什么要注意的地方
绑定一个ref属性，然后通过this.$refs.attributes就能拿到对应的标签，不管是直接查询标签还是引入了jquery
DOM操作都不能放在munted生命周期之前，vue中munted之前页面dom还没有渲染完毕，在munted之前获取不到vue中的dom

# vue状态管理 ！！！
State：存储状态数据
Getter：从状态数据派生数据，相当于State的计算属性。
Mutation：存储用于同步更改状态数据的方法，默认传入的参数为state。
Action：存储用于异步更改状态数据，但不是直接更改，而是通过触发Mutation方法实现，默认参数为context。
Module：Vuex模块化。

# vue插槽

