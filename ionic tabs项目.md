### ionic逼站视频学习

### 1.概念

ionic=Cordova+Angluar+ionic CSS

ionic调用原生的硬件功能基于Cordova，Cordova提供了使用JavaScript调用Native功能，ionic自己封装了一套漂亮的css ui库

### 2.文件结构目录

e2e=>端对端的测试文件

node_modules=>依赖模块

src=>开发目录

![](C:\Users\何昌龙\Desktop\v.png)

  ionic g --help  寻求帮助查看指令

  ionic g page button  创建页面时直接指令 会自动添加路由到路由管理模块里面

给予angular

创建好后什么都不用管，直接跳

```html
 <ion-button [routerLink]="['/button']" routerLinkActive="router-link-active" color="primary" expand="block"
    fill="clear" shape="round">
    跳转按钮组件页面
  </ion-button>
```

返回按钮

```html
 <ion-buttons slot="start">
      <ion-back-button>返回</ion-back-button>
    </ion-buttons>
```

### 3.路由和页面跳转，新增及自定义模块和数据渲染

#### 1.新建 ionic g page news

然后给上跳转

```JavaScript
 news.page.ts=>>
 //写入数据逻辑
 import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  public list: any = [];//先声明一个数据，这类似于vue
  constructor() { }

  ngOnInit() {

    for (let index = 0; index < 10; index++) {
      this.list.push(`这是第${index}条数据`)
      //在方法里面创建数据规则，当然也就是JavaScript循环和es6模板字符串喽，简单

    }
  }

}

```

```html
news.page.html=》》
 <ion-list *ngFor="let item of list">
    <ion-item>
      <ion-label>{{item}}</ion-label>
    </ion-item>
  </ion-list>
  数据就跑出来了
  // 快捷指令   ngfor
```

#### 2.新增路由子页面

ionic g page tab4  指令一样

只是把app-routing.module.ts里面新增的那句

```JavaScript
 {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  }
```

转移到tabs-routing.module.ts下面的子路由去就可以了，到不是很智能，我还以为一个可以全局，一个可以局部呢，哈哈

```JavaScript
 {
        path: 'tab4',
        loadChildren: () => import('../tab4/tab4.module').then(m => m.Tab4PageModule)
      }
      //注意改路径加个   .
```

然后tabs页面加个路由按钮就完事了

```html
tabs.page=》》
<ion-tab-button tab="tab4">
      <ion-icon name="ellipse"></ion-icon>
      <ion-label>Tab 4</ion-label>
    </ion-tab-button>
```

改图标直接进中文网差一个

#### 3.自定义一个公共模块,也就是封装组件。

不过ionic里面所有的页面都是模块，多个模块无法使用一个组件，所以需要把组件封装成模块，让模块引入模块，实现功能共享。

比如创建slide轮播图公共模块。

指令！！！

  ionic g module module/slide   创建模块文件夹 及slide模块

ionic g component module/slide		在slide模块创建组件

```javascript
slide.module.ts=》》
//引用注入并暴露出去备用
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide.component';//引用

@NgModule({
  declarations: [SlideComponent],//注入
  imports: [
    CommonModule
  ],
  exports: [SlideComponent]  //暴露
})
export class SlideModule { }
```

去到tab1使用

```typescript
tab1.module==》》

import { SlideModule } from '../module/slide/slide.module';
//注意这个地方是引入SlideModule而不是SlideComponent ，然后下面声明好就可以用了

@NgModule({
  imports: [

    SlideModule,
   
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule { }
```

再新建一个list模块，同理

不过要在自定义模块里面用ionic模块的话，就要引入ionic模块，不然报错。

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
// 引入ionicd的模块并声明
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ListComponent]

})
export class ListModule { }

```

### 4.ui组件的使用

#### 1.color

直接 快捷键 i-color就可以选择了

#### 2.button

text返回按钮设置名字 ，defaultHref返回到哪个路由，icon图标用什么

```html
 <ion-buttons slot="start">
      <!-- <ion-back-button text="返回" defaultHref="/tabs/tab1" icon="arrow-back-outline"> -->
      <ion-back-button text="返回">
      </ion-back-button>
    </ion-buttons>
```

#### 3.list

```html
 <ion-list lines='full'>
    <ion-item *ngFor="let item of list" [routerLink]="['/button']" routerLinkActive="router-link-active">
      <ion-label>{{item}}</ion-label>
    </ion-item>

  </ion-list>
```

lines

"full" | "inset" | "none" | undefined  可选，最好选full占满

mode

"ios" | "md"

ion-item-divider相当于标题栏，加sticky就能固定住

做聊天用头像<ion-avatar slot="start">

```html
<ion-item>
      <ion-avatar slot="start">
        <img src="../../assets/icon/favicon.png" />
      </ion-avatar>
      <ion-label> 消息和头像</ion-label>
    </ion-item>
```

重头戏，滑动列表  <ion-item-sliding>

```html
   <ion-item-sliding>
        <ion-item>
          <ion-label>滑动我</ion-label>
        </ion-item>
        <ion-item-options side="start">
          <ion-item-option (click)="favorite(item)">Favorite1</ion-item-option>
          <ion-item-option color="danger" (click)="share(item)">Share</ion-item-option>
        </ion-item-options>
        <ion-item-options side="end">
          <ion-item-option (click)="unread(item)">
            <ion-icon slot="top" name="ellipsis-horizontal-outline"></ion-icon>
            分享
          </ion-item-option>
          <ion-item-option color="warning" (click)="unread(item)">Unread1</ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
```

side="start" 左滑 side="end" 右滑

 <ion-icon slot="top" name="ellipsis-horizontal-outline"></ion-icon>图标在上

### 5.表单组件

#### 1.ion-input

常规的input radio checkbox toggle 控件，

注意哈数据放置和绑定就可以了，

#### 2.ion-select

```html
 <ion-select [(ngModel)]="peopleInfo.city">
        <ion-select-optio1n *ngFor="let item of peopleInfo.cityList" [value]="item">{{item}}</ion-select-optio1n>
      </ion-select>
```

#### 3.radio

要radio-group包裹

```html
<ion-radio-group [(ngModel)]="peopleInfo.payType">
      <ion-item>
        <ion-avatar slot="start">
          <img src="../../assets/shapes.svg" />
        </ion-avatar>
        <ion-label>支付宝支付</ion-label>
        <ion-radio slot="end" value="1"></ion-radio>
      </ion-item>
      <ion-item>
        <ion-avatar slot="start">
          <img src="../../assets/shapes.svg" />
        </ion-avatar>
        <ion-label>微信支付</ion-label>
        <ion-radio slot="end" value="2"></ion-radio>
      </ion-item>
    </ion-radio-group>
```

### 6.轮播图slide组件

#### 1.slide轮播图组件

i-slides快捷指令

下面是添加动态options，修改属性

```html
<ion-slides  pager="true" [options]='slideOpts'>
    <ion-slide *ngFor="let item of slidePage" class="slidec">
      <h1>第{{item.name}}{{item.value}}</h1>
    </ion-slide>

  </ion-slides>
```

下面是自己做按钮操作swiper方法

```html
 <ion-slides pager="true" #slidesc (ionSlideTouchEnd)="beginAutoPlay()">
    <ion-slide *ngFor="let item of slidePage" class="slidec">
      <h1>第{{item.name}}{{item.value}}</h1>
    </ion-slide>
  </ion-slides>
  <ion-button (click)="slidePrev()" fill="clear">
    <ion-icon name="arrow-back-circle-outline" color="tertiary"></ion-icon>
  </ion-button>
  <ion-button (click)="slideNext()" fill="clear">
    <ion-icon name="arrow-forward-circle-outline" color="tertiary"></ion-icon>
  </ion-button>
```

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
	//先获取ViewChild，这个应该是angular拿节点的操作
@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  @ViewChild('slidesc') slide2
    // 拿到前台命名的那个slidesc 注入 slide2里面
  slideOpts = {
    effect: 'cube',//轮播效果
    autoplay: {
      delay: 2000,
    },
    // loop: true
  }
  public slidePage: any = [
    {
      name: 1,
      value: '张图片'
    },
    {
      name: 2,
      value: '张图片'
    }, {
      name: 3,
      value: '张图片'
    }
  ]
  constructor() { }

  ngOnInit() {

  }
 //自己手动滑动后要触发的方法。
  beginAutoPlay() {
    this.slide2.startAutoplay()
    // 滑动后自动轮播
  }
 //结合前台的方法调用slide组件的内置方法就可以了
  slideNext() {
    this.slide2.slideNext()
  }
  slidePrev() {
    this.slide2.slidePrev()
  }
}

```

#### 2.searchbar组件

i-searchbar快捷键

```html
<ion-searchbar placeholder="加了animated属性" animated></ion-searchbar>
  <!-- 加animated属性后有一个选中后的动态效果 -->
  <ion-searchbar placeholder="type属性为number" type="number"></ion-searchbar>
  <!-- type属性改为number后只能输入数字 可选"email" | "number" | "password" | "search" | "tel" | "text" | "url"-->
  <ion-searchbar placeholder="颜色选取" color="secondary"></ion-searchbar>
  <!-- 颜色选取 -->
  <ion-searchbar placeholder="防抖效果的实现" debounce="500" (ionChange)="doCnange()"></ion-searchbar>
  <!-- 防抖效果的实现，延时请求 -->
  <ion-searchbar></ion-searchbar>
```

#### 3.segment组件

i-segment快捷键

使用ngModel绑定数据，然后使用ngSwitch做条件渲染，*ngSwitchCase选择条件

```html
<ion-header [translucent]="true">
  <ion-toolbar color="danger">
    <ion-segment [(ngModel)]="tab">
      <!-- 与tab双向数据绑定 -->
      <ion-segment-button value="tab1">
        <ion-label>简介</ion-label>
      </ion-segment-button>
      <ion-segment-button value="tab2">
        <ion-label>详情</ion-label>
      </ion-segment-button>
    </ion-segment>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="info" [ngSwitch]="tab">
    <!-- 这里的ngSwitchCase写法要注意，用了大小引号区分。 -->
    <div *ngSwitchCase="'tab1'">
      商品简介
    </div>
    <div *ngSwitchCase="'tab2'">
      商品详情
    </div>
  </div>
</ion-content>
```

#### 4.日期组件

```html
<ion-content>
  <ion-list lines='full'>
    <ion-item>
      <ion-label color="primary">汉化确定和取消按钮</ion-label>
      <ion-datetime [(ngModel)]="nowDay" display-format="YYYY-MM-DD" picker-format="YYYY MM DD"
        (ionChange)='datetimeChange($event)' [pickerOptions]='cus' placeholder="汉化确定和取消按钮">
      </ion-datetime>
      <!-- 保持绑定数据和显示的格式要一样 -->
    </ion-item>
  </ion-list>
  {{day}}
  {{nowDay}}
</ion-content>
```

装一个npm包转日期   npm i silly-datetime

```typescript
import { Component, OnInit } from '@angular/core';

import sd from 'silly-datetime';
//引入时间重置包
@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
})
export class DatetimePage implements OnInit {
  day = '2019-02-14'
  public nowDay;
  constructor() {
    var d = new Date()
    // Mon Jun 15 2020 16:52:52 GMT+0800 (中国标准时间)
    // 引入后用他的内置方法直接重置sd
    this.nowDay = sd.format(new Date(), 'YYYY-MM-DD')
  }
  //重置两个按钮的文字
  public cus = {
    buttons: [{
      text: '取消',
      handler: () => console.log('Clicked Save!')
    }, {
      text: '确认',
      handler: () => {
        console.log('Clicked Log. Do not Dismiss.');
      }
    }]
  }
  ngOnInit() {
  }
  //确定后所要执行的方法
  datetimeChange(e) {
    console.log(e.detail.value);
  }
}

```

### 7.主题改造

```scss
variables.scss=>>>
//这样就可以在页面里面直接color="aaaa"了
.ion-color-aaaa {
  --ion-color-base: #38ffcd;
  --ion-color-base-rgb: 56, 128, 255;
  --ion-color-contrast: #ffffff;
  --ion-color-contrast-rgb: 255, 255, 255;
  --ion-color-shade: #38ffcd;
  --ion-color-tint: #38ffcd;
}

//修改button组件的默认样式，其他同理
ion-button {
  --color: #36abe0;
  --background: #546b75;
}
```

### 8.各动态组件（action alert等）

#### 1.ion-action-sheet弹出层

```html
  <ion-button (click)="showAction()" expand="block" fill="clear" shape="round">
    弹出actionsheet
  </ion-button>
```

``` typescript
import { ActionSheetController } from '@ionic/angular';
 //引入
constructor(public actionSheetController: ActionSheetController) { }
//注入使用
  async showAction() {
    const actionSheet = await this.actionSheetController.create({
      header: '我是标题',
      mode: 'ios',
      //各端均使用ios模式
      cssClass: 'my-custom-class',
      buttons: [{
        text: '删除',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: '喜欢',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: '取消',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
```

#### 2.ion-toast提示框

```typescript
import { ToastController } from '@ionic/angular';
constructor(public toastController: ToastController) { }
async presentToast() {
    const toast = await this.toastController.create({
      message: '登录成功',
      duration: 2000,
      //消失时间
      position: 'top',
      // 出现位置
      color: 'dark',
      // 颜色
      cssClass: 'mytoast'
      //给个类修改样式,样式给在全局里面variables.scss
    });
    toast.present();
  }
//方法调用同上，属性看文档
```

#### 3.ion-loading

```
同上，直接看代码和文档
```

#### 4.ion-alert

```typescript
handler: (res) => {
            console.log(res);
          }
          //有表单通过这个方式获取所有值。
```

#### 5.手势相关

1.ionic g page gestures 建页面

2.npm install hammerjs --save  安装手势相关的模块

3.app.module.ts=>>

```typescript
import { HammerModule} from '@angular/platform-browser';
@NgModule({
  declarations: [AppComponent],//声明组件
  entryComponents: [],//配置不会在模块中使用的组件
  imports: [BrowserModule, HammerModule, IonicModule.forRoot(), AppRoutingModule],//引入的模块 依赖的模块
  providers: [  //配置服务
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
```

4.main.ts=>>

```typescript
import 'hammerjs'
```

### 9.model对话框

```typescript
ionic g  component  model/components/login
//创建组件到model下面
model.module=》》》
import { LoginComponent } from './components/login/login.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModelPageRoutingModule
  ],
  declarations: [ModelPage, LoginComponent],//注入
  entryComponents: [LoginComponent]//注入
})
export class ModelPageModule { }
model.page=》》》
import { ModalController } from '@ionic/angular';
import { LoginComponent } from './components/login/login.component';
	constructor(public modalController: ModalController) {

  	}	
async onClick() {
    const modal = await this.modalController.create({
      component: LoginComponent,
      // 使用组件
      componentProps: { username: 123, info: '我的信息', phone: 123123123 },
      // 传值
      cssClass: 'my-custom-class'
      // 给个类
    });
    return await modal.present();
  }
login.component=》》》
//接收
import { NavParams, ToastController, LoadingController } from '@ionic/angular'
//引入toast，loading，navparams组件
export class LoginComponent implements OnInit {

 constructor(public loadingController: LoadingController, public toastController: ToastController, public navParams: NavParams) {
    this.id = this.navParams.data.id
     //赋值id，根据id判断编写成登录或者注册页面
  }

  ngOnInit() { }
 async onClick() {
    if (this.info) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: '登录中，请稍等...',
        spinner: 'crescent',
        duration: 2000
      });
      await loading.present();
      await loading.onDidDismiss();
        //loading完成后
        //展开toast
      const toast = await this.toastController.create({
        message: '登录成功',
        duration: 2000,
        position: 'middle',
        color: 'dark',
        cssClass: 'mytoast'
      });
      toast.present();
        //销毁并回传值给modal父页面使用。
      this.navParams.data.modal.dismiss(
        {
          result: this.info
        }
      )
    }
  }
}
```

### 10.picker

ionic g service picker

### 11.下拉刷新

```html
<ion-list>

    <ion-item *ngFor="let item of list">
      <ion-label>{{item}}</ion-label>
    </ion-item>

  </ion-list>
<ion-infinite-scroll threshold="10%" #infinite position="bottom" (ionInfinite)="loadData($event)">
    <!-- threshold表示距离底部距离触发该事件，ionInfinite表示触发事件传参可用 -->
    <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="正在加载更多数据...">
      <!-- loadingSpinner表示图标可选，loadingText表示显示文字 -->
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>
```

```typescript
可以用节点的方式禁用刷新功能，线引入ViewChild
 @ViewChild('infinite') myinfinite;
loadData(e) {
    console.log(e);

    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.list.push(`这是第${i + 21}条数据--服务器获取的`)
      }
      e.target.complete()
      //重载e事件，继续加载载。
      if (this.list.length > 40) {
        e.target.disabled = true
        // 模拟数据库数据查完之后禁用该功能,以出刷新功能
          // this.myinfinite.disabled = true
          // 使用了this.myinfinite去禁用
      }
    }, 1000);

  }
```

### 12.接口处理加下拉刷新。

ionic g service services/httpservice

创建服务。

先进入根模块

```typescript
app.module.ts=》》

 import { HttpClientModule } from '@angular/common/http';

imports: [HttpClientModule, BrowserModule, HammerModule, IonicModule.forRoot(), AppRoutingModule]
```

```typescript
httpservice.service.ts=》》》

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(public http: HttpClient) { }
     public config: any = {
    domain: 'http://localhost:3000'
  };
  public httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
   get(url) {
    const api = this.config.domain + url;
    return new Promise((resolve, reject) => {
      // 新建Promise实例，传成功或失败参数方法
      // 发起请求，成功回调res，失败返回错误
      this.http.get(api).subscribe((res) => {
        resolve(res)
      }, (err) => {
        reject(err)
      })
    })

  }
}


```

建立号服务之后再回到根模块引入处理好之后的HttpserviceService

```typescript
// 引入请求数据的服务
import { HttpserviceService } from './services/httpservice.service';
providers: [  //配置服务
    StatusBar,
    SplashScreen,
    HttpserviceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
```

调接口。

```typescript
infinite.page.ts=>>
import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../services/httpservice.service';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
})
export class InfinitePage implements OnInit {
  public list: any[] = [];
  constructor(public httpService: HttpserviceService) {
    console.log(1);
    console.log(this.httpService.get);
  }

  ngOnInit() {
    this.loadData(null)
      一进入就先请求一次数据
  }
 loadData(e) {

    this.httpService.get(this.page).then((res: any) => {
      console.log(res.result);
      this.list = this.list.concat(res.result)
      // concat方法拼接
      ++this.page;
        //page数自加
      if (res.result.length < 20) {
          //条数小于20则关闭
        e ? e.target.disabled = true : ''
          //判断是否有参数，有再执行关闭下拉刷新，没有则什么都不做
        this.hasMore = false
        // 关闭下拉刷新然后改变状态显示提醒
      }
      e ? e.target.complete() : '' //同上判断

    })
  }

}

```

### 13.顶部下拉刷新

```html
随便建点数据
html
<ion-content>
  <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
    <ion-refresher-content pullingIcon="chevron-down-circle-outline" pullingText="Pull to refresh"
      refreshingSpinner="circles" refreshingText="Refreshing...">
    </ion-refresher-content>
  </ion-refresher>
  <ion-list>
    <ion-item *ngFor="let item of list">
      <ion-label>{{item}}</ion-label>
    </ion-item>
  </ion-list>
</ion-content>
```

```typescript

export class RefresherPage implements OnInit {
  public list: any[] = [];
  constructor() {
    for (let i = 0; i < 10; i++) {
      this.list.push(`我是第${i}条数据`)

    }
  }

  ngOnInit() {
  }
  doRefresh(e) {
    setTimeout(() => {
      for (let i = 0; i < 10; i++) {
        this.list.unshift(`我是第${i}条数据`)
		//顶部插入
      }
      e.target.complete();
        //解除
    }, 2000);
  }
}

```

### 14.路由跳转和传值

```HTML
新建了login和pinfo页面
标签内传值
 [routerLink]="['/news']" [queryParams]="{aid:aid,cid:'1'}"
```

```typescript
import { ActivatedRoute } from '@angular/router';
//引入
export class NewsPage implements OnInit {

  public list: any = [];
  constructor(public route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.subscribe((data) => {
      console.log(data);
    })
    //输出
  }

}

```

### 15.NavController路由

```html
 <ion-buttons slot="start">
      <ion-button (click)="goback()">
        <ion-icon slot="start" name="arrow-back"></ion-icon>
        返回
      </ion-button>
    </ion-buttons>
```



```typescript

import { NavController } from '@ionic/angular';


export class PinfoPage implements OnInit {

  constructor(public nav: NavController) { }

  goback() {
  	this.nav.navigateBack('/tabs/tab1')
      //如果此处是多页面调转至此返回至对应的页面的话，就引入路由传参就可以了
       this.nav.navigateForward('/tabs/home', {
          queryParams: {
            query: true
          }
        });
      //如果传参
  }
    
}

```

处理注册完成后直接返回到首页。

```typescript
 onClick() {
    setTimeout(() => {
      this.nav.navigateRoot('tabs/tab1')
    }, 1000);
  }
//模拟返回效果
```

### 16.Ionic 开发之 Ionic Storage 详解

一定注意同步和异步问题。

ionic cordova plugin add cordova-sqlite-storage

npm install --save @ionic/storage

```
app.module.ts=>>>
import { IonicStorageModule } from '@ionic/storage';
imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ]
```

组件引入

```typescript
import { Storage } from '@ionic/storage';
constructor(
    public storage: Storage) {
  }
  
  this.storage.set('name', 'semlinker');
this.storage.get('name').then((name) => {
  console.log('Me: Hey, ' + name + '! You have a very nice name.');
  console.log('You: Thanks! I got it for my birthday.');
});
this.storage.remove('name').then(() => {
  console.log('Name item has been removed');
});
```

### 17.运行

```
ionic serve --address 192.168.0.101
```

### 18.优化

```
 <div class="center" *ngIf="!hasData">
    <ion-spinner name="circles"></ion-spinner>
  </div>
  请求数据完成修改hasData状态，优化体验
```

