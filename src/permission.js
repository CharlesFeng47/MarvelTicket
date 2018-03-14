import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// 不重定向白名单
const whiteList = ['/login', '/spot_sign_up', '/spot_sign_up/step1', '/spot_sign_up/step2', '/spot_sign_up/step3']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    // 已登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 不进入白名单的网址
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const data = JSON.parse(res.object)
          const roles = data.role
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            console.log(router)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next()
        next()
      }
    }
  } else {
    // 未登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 可直接白名单的网址
      next()
    } else {
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
