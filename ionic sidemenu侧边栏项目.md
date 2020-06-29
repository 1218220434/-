## ionic sidemenu侧边栏项目

```html
 <ion-menu side="start" type="reveal" swipe-gesture contentId="main-content" menuId='start'>
      <!-- side设置侧边栏位置，可选end type设置样式，overlay push 可选 reveal表示不层叠 swipe-gesture表示开启手势滑动侧边栏。 -->
      <ion-header>
        <ion-toolbar color="dark">
          <ion-title>End Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>

          <ion-menu-toggle auto-hide="false" *ngFor="let p of appPages; let i = index">
            <!-- 加上ion-menu-toggle可以在点击路由后，隐藏侧边栏 -->
            <ion-item (click)="selectedIndex = i" routerDirection="root" [routerLink]="[p.url]" lines="none"
              detail="false" [class.selected]="selectedIndex == i">
              <ion-icon slot="start" [ios]="p.icon + '-outline'" [md]="p.icon + '-sharp'"></ion-icon>
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>


        </ion-list>
      </ion-content>
    </ion-menu>
     <ion-router-outlet id="main-content"></ion-router-outlet>
 <!-- contentId="main-content"与路由的id="main-content"关联  menuId='start'可以与点击的那个图标关联-->
 <!--  <ion-buttons slot="start">
      <ion-menu-button menu="start"></ion-menu-button>
    </ion-buttons> -->

```

也可以通过组件内部属性去实现打开侧边栏方法

```html
<ion-button (click)="openSlideMenu()" expand="block" fill="clear" shape="round">
    自定义方法打开侧边栏
  </ion-button>
```

```typescript

import { MenuController } from '@ionic/angular';

 constructor (private  menu: MenuController) { }

 openSlideMenu() {

  this.menu.open('end')

 }
//可以按住ctrl点开MenuController查看它有哪些方法
```

如果在tabs项目里面融合侧边栏，就在app.component.html里面加

只要对应上id就行了，可以手势滑动出来

<ion-router-outlet main></ion-router-outlet>

给链接附上

[routerDirection]="'root'"

可以取消动画效果，直接进入路由