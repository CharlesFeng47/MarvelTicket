import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* 首页的 Layout */
import HomeLayout from '../components/HomeLayout/index'

/* 回到顶部的 Layout */
import Layout from '../components/Layout/index'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
    isHome: true                 展示首页轮播图
    isSearch: true               搜索界面不展示二级导航
    isLike: true                 是否为我的收藏界面
  }
 **/
export const constantRouterMap = [
  {
    path: '/home', component: Layout, hidden: true,
    children: [
      {
        path: '', component: HomeLayout, hidden: true,
        children: [
          { path: '',
            hidden: true,
            component: () => import('@/views/home/index'),
            meta: { isHome: true, isSearch: false, isLike: false }}
        ]
      }
    ]
  },

  {
    path: '/schedule', component: Layout, hidden: true,
    children: [
      {
        path: '', component: HomeLayout, hidden: true,
        children: [
          {
            path: '',
            hidden: true,
            component: () => import('@/views/schedule/index'),
            meta: { isHome: false, isSearch: false, isLike: false }
          }
        ]
      }
    ]
  },
  {
    path: '/search', component: Layout, hidden: true,
    children: [
      {
        path: '', component: HomeLayout, hidden: true,
        children: [
          {
            path: '',
            hidden: true,
            component: () => import('@/views/schedule/index'),
            meta: { isHome: false, isSearch: true, isLike: false }
          }
        ]
      }
    ]
  },
  {
    path: '/detail/:programId', component: Layout, hidden: true,
    children: [
      { path: '', hidden: true, component: () => import('@/views/detail/index') }
    ]
  },
  {
    path: '/center', component: Layout, hidden: true,
    children: [
      {
        path: 'manage', hidden: true, component: () => import('@/views/center/index'),
        children: [
          { path: 'order', hidden: true, component: () => import('@/views/center/order/index'), meta: { manage: 1 }},
          { path: 'like', hidden: true, component: () => import('@/views/center/like/index'), meta: { manage: 2, isLike: true }},
          { path: 'message', hidden: true, component: () => import('@/views/center/message/index'), meta: { manage: 3 }}
        ]
      }
    ]
  },
  {
    path: '/pay', component: Layout, hidden: true,
    children: [
      {
        path: '', hidden: true, component: () => import('@/views/pay/index')
      }
    ]
  },
  {
    path: '/member_active/:activeUrl', component: () => import('@/views/memberActive/index'), hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/loginAndRegister', component: Layout, hidden: true,
    children: [
      {
        path: 'login', component: () => import('@/views/loginAndRegister/index'), hidden: true,
        children: [{
          path: '', component: () => import('@/views/loginAndRegister/login/index'), hidden: true
        }]
      },
      {
        path: 'register', component: () => import('@/views/loginAndRegister/index'), hidden: true,
        children: [{
          path: '', component: () => import('@/views/loginAndRegister/register/index'), hidden: true
        }]
      }
    ]
  },
  {
    path: '/orderConfirm', component: Layout, hidden: true,
    children: [
      {
        path: '', hidden: true, component: () => import('@/views/orderConfirm/index')
      }
    ]
  },
  {
    path: '/paySuccess', component: Layout, hidden: true,
    children: [
      {
        path: '', hidden: true, component: () => import('@/views/paySuccess/index')
      }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/payment',
    component: Layout,
    name: 'Payment',
    meta: { title: '支付' },
    hidden: true,
    children: [
      {
        path: ':orderId',
        name: 'PaymentIndex',
        component: () => import('@/views/payment/index'),
        meta: { title: '订单支付', roles: ['MEMBER'] }
      }
    ]
  },

  // {
  //   path: '/examine',
  //   component: Layout,
  //   redirect: '/examine/spot',
  //   name: 'Examine',
  //   meta: { title: '审核', icon: 'example', roles: ['MANAGER'] },
  //   children: [
  //     {
  //       path: 'spot',
  //       name: 'ExamineSpot',
  //       hidden: false,
  //       component: () => import('@/views/examine/spot/index'),
  //       meta: { title: '场馆审批', icon: 'schedule', roles: ['MANAGER'] },
  //       children: [
  //         { path: '', component: () => import('@/views/examine/spot/overall/index'), meta: { roles: ['MANAGER'] }},
  //         {
  //           path: ':spotId',
  //           name: 'UnexaminedSpotDetail',
  //           component: () => import('@/views/examine/spot/unexaminedSpotDetail/index'),
  //           meta: { title: '场馆详情', roles: ['MANAGER'] }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'schedule',
  //       name: 'SettleSchedule',
  //       hidden: false,
  //       component: () => import('@/views/examine/schedule/index'),
  //       meta: { title: '计划结算', icon: 'schedule', roles: ['MANAGER'] }
  //     }
  //   ]
  // },

  {
    path: '/statistics',
    component: Layout,
    name: 'Statistics',
    hidden: false,
    meta: { title: '统计', icon: 'example', roles: ['MEMBER', 'SPOT', 'MANAGER'] },
    children: [
      {
        path: 'orders',
        name: 'StatisticsOrder',
        hidden: false,
        component: () => import('@/views/statistics/orders/index'),
        meta: { title: '订单情况', icon: 'schedule', roles: ['MEMBER', 'SPOT'] }
      },
      {
        path: 'members',
        name: 'StatisticsMember',
        hidden: false,
        component: () => import('@/views/statistics/members/index'),
        meta: { title: '会员统计', icon: 'schedule', roles: ['MANAGER'] }
      },
      {
        path: 'spots',
        name: 'StatisticsSpot',
        hidden: false,
        component: () => import('@/views/statistics/spots/index'),
        meta: { title: '场馆统计', icon: 'schedule', roles: ['MANAGER'] }
      },
      {
        path: 'consumption',
        name: 'StatisticsConsumption',
        hidden: false,
        component: () => import('@/views/statistics/consumption'),
        meta: { title: '交易记录', icon: 'schedule', roles: ['MEMBER', 'SPOT', 'MANAGER'] }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
