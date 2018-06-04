# Marvel Ticket 文件目录指南

## dist

这是vue编译后的打包地址。

## static

一些使用的不会变动的资源。

## src

#### api

前端调用的后端api集合。

#### assets

此项目中需要使用的资源。

#### components

项目中需要被复用的组件，比如在项目中的SvgIcon，就是一个传入`/src/icons`目录下svg图像的名称，就能构成一个svg图标的组件。

#### icons

项目提供的 svg适配组件，在`/src/icons/index.js`中被导入Vue项目。

#### router

使用vue-router，分为constantRouterMap静态路由和asyncRouterMap动态路由两个部分。静态路由是为登陆就能够访问的，动态路由是和角色权限相关的部分。（动态路由的生成在`/src/permission.js`中）

#### store

使用vuex，`getter.js`提供给vue组件访问，`/modules`各文件分别存储各种组件的状态。

#### utils

`request.js`统一提供对后端的访问，提供了request和response的拦截器。

#### views

+ dashboard：登陆之后的首页。
+ examine
  + schedule：经理结算计划的钱。
  + spot：经理审核场馆。
+ Layout：整个项目的layout。
  + component
    + Sidebar：左边功能框。
    + Navbar.vue：正上方导航栏。
    + AppMain.vue：提供`router-view`，根据路由加载不同的子组件。
  + Layout.vue：对项目提供统一的结构。
+ login：各角色的登录界面。
+ memberActive：会员邮件认证之后的界面。
+ order
  + newOrder：下达订单的各步骤。
  + oneOrder：查看订单详情。
  + index.vue：查看所有订单。
+ payment：订单的支付界面。
+ schedule
  - newSchedule：新建计划的各步骤。
  - oneSchedule：查看计划详情。
  - CheckTicket.vue：订单检票登记。
  - index.vue：查看所有计划。
+ seatChart
  + DisplayOnly.vue：场馆座位图展示，查看场馆座位图时使用。
  + index.vue：场馆座位图生成，注册场馆时使用。
  + memberChoose.vue：用户选择座位，订票时使用。
+ statistics
  + members：对会员情况的统计。
  + orders：对订单情况的统计。
  + spots：对场馆收入统计的统计。
  + consumption.vue：展示消费记录。
  + PieChart.vue：封装echart展示。
+ user：各角色的个人信息界面。

## 注

1. 两个资源文件夹（`/statics`和`/src/assets`）之间的区别：[https://segmentfault.com/q/1010000009842688](https://segmentfault.com/q/1010000009842688)