import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

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
  }
 **/
export const constantRouterMap = [
  { path: '/member_active/:activeUrl', component: () => import('@/views/memberActive/index'), hidden: true
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/spot_sign_up', component: () => import('@/views/user/spot/modify/index'), hidden: true,
    children: [
      { path: '', hidden: true, component: () => import('@/views/user/spot/modify/step1'), meta: { isNew: true }},
      { path: 'step1', hidden: true, component: () => import('@/views/user/spot/modify/step1'), meta: { isNew: true }},
      { path: 'step2', hidden: true, component: () => import('@/views/user/spot/modify/step2'), meta: { isNew: true }},
      { path: 'step3', hidden: true, component: () => import('@/views/user/spot/modify/step3'), meta: { isNew: true }}
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
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  }
]

export const asyncRouterMap = [
  {
    path: '/user_info',
    component: Layout,
    name: 'UserInfo',
    meta: { title: '身份' },
    hidden: true,
    children: [
      { path: '', component: () => import('@/views/user/index') },
      { path: 'modify_spot', component: () => import('@/views/user/spot/modify/index'), meta: { roles: ['SPOT'] },
        children: [
          { path: '', hidden: true, component: () => import('@/views/user/spot/modify/step1'), meta: { isNew: false, roles: ['SPOT'] }},
          { path: 'step1', hidden: true, component: () => import('@/views/user/spot/modify/step1'), meta: { isNew: false, roles: ['SPOT'] }},
          { path: 'step2', hidden: true, component: () => import('@/views/user/spot/modify/step2'), meta: { isNew: false, roles: ['SPOT'] }},
          { path: 'step3', hidden: true, component: () => import('@/views/user/spot/modify/step3'), meta: { isNew: false, roles: ['SPOT'] }}
        ]
      },
      { path: 'modify_member', hidden: true, component: () => import('@/views/user/member/modify'), meta: { roles: ['MEMBER'] }}
    ]
  },

  {
    path: '/schedule',
    component: Layout,
    redirect: '/schedule/overall',
    name: 'Schedule',
    meta: { title: '计划', icon: 'example', roles: ['MEMBER', 'SPOT'] },
    children: [
      {
        path: 'check_ticket',
        name: 'CheckTicket',
        hidden: false,
        component: () => import('@/views/schedule/CheckTicket'),
        meta: { title: '检票登记', icon: 'check_ticket', roles: ['SPOT'] }
      },
      {
        path: 'overall',
        name: 'ScheduleAll',
        hidden: false,
        component: () => import('@/views/schedule/index'),
        meta: { title: '查看', icon: 'schedule', roles: ['MEMBER', 'SPOT'] }
      },
      {
        path: 'new_schedule',
        name: 'ScheduleNew',
        hidden: false,
        component: () => import('@/views/schedule/newSchedule/index'),
        meta: { title: '新增', icon: 'plus', roles: ['SPOT'] },
        children: [
          { path: '', hidden: true, component: () => import('@/views/schedule/newSchedule/step1'), meta: { isNew: true, roles: ['SPOT'] }},
          { path: 'step1', hidden: true, component: () => import('@/views/schedule/newSchedule/step1'), meta: { isNew: true, roles: ['SPOT'] }},
          { path: 'step2', hidden: true, component: () => import('@/views/schedule/newSchedule/step2'), meta: { isNew: true, roles: ['SPOT'] }},
          { path: 'step3', hidden: true, component: () => import('@/views/schedule/newSchedule/step3'), meta: { isNew: true, roles: ['SPOT'] }}

        ]
      },
      {
        path: 'modify/:scheduleId',
        name: 'ScheduleModify',
        hidden: true,
        component: () => import('@/views/schedule/newSchedule/index'),
        meta: { title: '修改', roles: ['SPOT'] },
        children: [
          { path: '', hidden: true, component: () => import('@/views/schedule/newSchedule/step1'), meta: { isNew: false, roles: ['SPOT'] }},
          { path: 'step1', hidden: true, component: () => import('@/views/schedule/newSchedule/step1'), meta: { isNew: false, roles: ['SPOT'] }},
          { path: 'step2', hidden: true, component: () => import('@/views/schedule/newSchedule/step2'), meta: { isNew: false, roles: ['SPOT'] }},
          { path: 'step3', hidden: true, component: () => import('@/views/schedule/newSchedule/step3'), meta: { isNew: false, roles: ['SPOT'] }}

        ]
      },
      {
        path: ':scheduleId',
        name: 'ScheduleOne',
        hidden: true,
        component: () => import('@/views/schedule/oneSchedule/index'),
        meta: { title: '详情', roles: ['MEMBER', 'SPOT'] }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/overall',
    name: 'Order',
    meta: { title: '订单', icon: 'example', roles: ['MEMBER', 'SPOT'] },
    children: [
      {
        path: 'overall',
        name: 'OrderAll',
        hidden: false,
        component: () => import('@/views/order/index'),
        meta: { title: '查看', icon: 'schedule', roles: ['MEMBER', 'SPOT'] }
      },
      {
        path: 'new_order',
        name: 'OrderNew',
        hidden: true,
        component: () => import('@/views/order/newOrder/index'),
        meta: { title: '新增', icon: 'plus', roles: ['MEMBER'] },
        children: [
          { path: '', hidden: true, component: () => import('@/views/order/newOrder/step1'), meta: { isNew: true, buyOnSpot: false, roles: ['MEMBER'] }},
          { path: 'step1', hidden: true, component: () => import('@/views/order/newOrder/step1'), meta: { isNew: true, buyOnSpot: false, roles: ['MEMBER'] }},
          { path: 'step2', hidden: true, component: () => import('@/views/order/newOrder/step2'), meta: { isNew: true, buyOnSpot: false, roles: ['MEMBER'] }},
          { path: 'step3', hidden: true, component: () => import('@/views/order/newOrder/step3'), meta: { isNew: true, buyOnSpot: false, roles: ['MEMBER'] }}
        ]
      },
      {
        path: 'buy_on_spot',
        name: 'SpotBuy',
        hidden: true,
        component: () => import('@/views/order/newOrder/index'),
        meta: { title: '新增', icon: 'plus', roles: ['SPOT'] },
        children: [
          { path: '', hidden: true, component: () => import('@/views/order/newOrder/step1'), meta: { isNew: true, buyOnSpot: true, roles: ['SPOT'] }},
          { path: 'step1', hidden: true, component: () => import('@/views/order/newOrder/step1'), meta: { isNew: true, buyOnSpot: true, roles: ['SPOT'] }},
          { path: 'step2', hidden: true, component: () => import('@/views/order/newOrder/step2'), meta: { isNew: true, buyOnSpot: true, roles: ['SPOT'] }},
          { path: 'step3', hidden: true, component: () => import('@/views/order/newOrder/step3'), meta: { isNew: true, buyOnSpot: true, roles: ['SPOT'] }}
        ]
      },
      {
        path: ':orderId',
        name: 'OrderOne',
        hidden: true,
        component: () => import('@/views/order/oneOrder/index'),
        meta: { title: '详情', isNew: false, roles: ['MEMBER'] }
      }
    ]
  },

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

  {
    path: '/examine',
    component: Layout,
    redirect: '/examine/spot',
    name: 'Examine',
    meta: { title: '审核', icon: 'example', roles: ['MANAGER'] },
    children: [
      {
        path: 'spot',
        name: 'ExamineSpot',
        hidden: false,
        component: () => import('@/views/examine/spot/index'),
        meta: { title: '场馆审批', icon: 'schedule', roles: ['MANAGER'] },
        children: [
          { path: '', component: () => import('@/views/examine/spot/overall/index'), meta: { roles: ['MANAGER'] }},
          {
            path: ':spotId',
            name: 'UnexaminedSpotDetail',
            component: () => import('@/views/examine/spot/unexaminedSpotDetail/index'),
            meta: { title: '场馆详情', roles: ['MANAGER'] }
          }
        ]
      },
      {
        path: 'schedule',
        name: 'SettleSchedule',
        hidden: false,
        component: () => import('@/views/examine/schedule/index'),
        meta: { title: '计划结算', icon: 'schedule', roles: ['MANAGER'] }
      }
    ]
  },

  {
    path: '/statistics',
    component: Layout,
    name: 'Statistics',
    hidden: false,
    meta: { title: '统计', icon: 'example', roles: ['MEMBER', 'SPOT'] },
    children: [
      {
        path: 'subscribe',
        name: 'StatisticsSubscribe',
        hidden: false,
        component: () => import('@/views/statistics/subscribe'),
        meta: { title: '预订', icon: 'schedule', roles: ['MEMBER', 'SPOT'] }
      },
      {
        path: 'unsubscribe',
        name: 'StatisticsUnsubscribe',
        hidden: false,
        component: () => import('@/views/statistics/unsubscribe'),
        meta: { title: '退订', icon: 'schedule', roles: ['MEMBER', 'SPOT'] }
      },
      {
        path: 'consumption',
        name: 'StatisticsConsumption',
        hidden: false,
        component: () => import('@/views/statistics/consumption'),
        meta: { title: '金库', icon: 'schedule', roles: ['MEMBER', 'SPOT'] }
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
