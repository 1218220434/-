# AngularJS 教程

### 1.表达式及指令

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

</head>

<body>
    <div ng-app="">
        <p>输入</p>
        <p>姓名: <input type="text" ng-model="name"></p>
        <p ng-bind="name"></p>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.8/angular.min.js"></script>
</body>

</html>
```

当网页加载完毕，AngularJS 自动开启。

**ng-app** 指令告诉 AngularJS，<div> 元素是 AngularJS **应用程序** 的"所有者"。

**ng-model** 指令把输入域的值绑定到应用程序变量 **name**。

**ng-bind** 指令把应用程序变量 name 绑定到某个段落的 innerHTML。

2.

```html
<div ng-app="" ng-init='firstName="john";end="cc"'>

<p>姓名为 <span ng-bind="firstName"></span></p>
<p>姓名为 <span > {{firstName+end}}</span></p>
上述方式都可以
</div>
```

**ng-init** 指令初始化 AngularJS 应用程序变量。

3.声明ng-app=""只能一次，跟vue一样，可以多次初始化变量（ng-init="quantity=2;cost=5"），在子元素内使用。

初始化变量跟JavaScript变量一回事，所有数据类型都可以

对象:

```html
<div ng-app="" ng-init="person={firstName:'John',lastName:'Doe'}">

<p>姓为 {{ person.lastName }}</p>

</div>
```

数组:

```html
<div ng-app="" ng-init="points=[1,15,19,2,40]">

<p>第三个值为 {{ points[2] }}</p>

</div>
```

### 2.Scope(作用域)及控制器

```html
<div ng-app="myApp" ng-controller="myCtrl">

		<h1>{{carname}}</h1>
 		<input ng-model="name">

        <h1>我的名字是 {{name}}</h1>
      	<ul>
            <li ng-repeat="x in names">{{x}}</li>
        </ul>
    	 <h1>我的名字是 {{fullName()}}</h1>
</div>

<script>
var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope) {
    $scope.carname = "Volvo";
    $scope.name = "John Dow";
     $scope.names = ["Emil", "Tobias", "Linus"];
    $scope.fullName = function () {
                return $scope.carccname + " " + $scope.carcccname;
            }
});
</script>
```

scope 是模型。

scope 是一个 [JavaScript 对象](https://www.w3cschool.cn/javascript/js-objects.html)，带有属性和方法，这些属性和方法可以在视图和控制器中使用。

修改了视图，模型和控制器也会相应更新

也可以做循环,也可以是方法，详见fullName方法

可以通过其他js文件引入控制器,以下

```javascript
cc.js=>>
angular.module('myApp', []).controller('namesCtrl', function($scope) {
    $scope.names = [
        {name:'Jani',country:'Norway'},
        {name:'Hege',country:'Sweden'},
        {name:'Kai',country:'Denmark'}
    ];
}); 
```

```html
<div ng-app="myApp" ng-controller="namesCtrl">

<ul>
 <li ng-repeat="x in names">
    {{ x.name + ', ' + x.country }}
  </li>
</ul>

</div>

<script src="cc.js"></script>
```

### 3.过滤器

过滤器可以通过一个管道字符（|）和一个过滤器添加到表达式中。

| 过滤器    | 描述                     |
| :-------- | :----------------------- |
| currency  | 格式化数字为货币格式。   |
| filter    | 从数组项中选择一个子集。 |
| lowercase | 格式化字符串为小写。     |
| orderBy   | 根据某个表达式排列数组。 |
| uppercase | 格式化字符串为大写。     |
| limitTo   | 限制数量                 |

```html
  <div ng-controller="myCtrl-two">
            <h1>{{carnamecc}}</h1>
            <h2>以下为外部引入控制器的数据并加入过滤器</h2>
            <p>姓名为大写版本 {{ lastName | uppercase }}</p>
            <p>姓名为大写版本 {{ aastName | lowercase  }}</p>
            <p>总价 = {{ (quantity * price) | currency }}</p>
            <ul>
                <li ng-repeat="x in names | orderBy : 'name' | limitTo: 2">
                    {{ x.name + ', ' + x.country }}
                </li>
            </ul>
            <p><input type="text" ng-model="test"></p>

				<ul>
  					<li ng-repeat="x in names | filter:test | orderBy:'country'">
   					 {{ (x.name | uppercase) + ', ' + x.country }}
  					</li>
				</ul>
        </div>
```

不仅是在循环数组后面可以用过滤器，在单个数据后接| uppercase也实现了同样的道理，filter:test用于筛选对应的值并返回,类似于搜索功能。

### 4.服务

```javascript
app.controller('myCtrl-thr', function ($scope, $location, $http,$timeout,$interval) {
    $scope.myUrl = $location.absUrl();
    $scope.myUrlc = function () {
        console.log($location)
    }
    
    $http.get("http://localhost:3000/web/api/heroes/list").then(function (response) {
        $scope.myWelcome = response.data;
    });
    
	$scope.myHeader = "Hello World!";
    $timeout(function () {
        $scope.myHeader = "How are you today?";
    }, 2000);
    
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
    }, 1000);
})
```

$scope, $location, $http后面的这些参数分别是$location服务、$http服务、除此之外还有$timeout服务、$interval服务

myWelcome就可以拿去做数据循环了。

自定义服务如下

```javascript
app.service('hexafy', function () {
    this.myFunc = function (x) {
        return x * 40;
    }
});
app.controller('myCtrl-myMethod', function ($scope, hexafy) {
    $scope.hex = hexafy.myFunc(2);
});
```





