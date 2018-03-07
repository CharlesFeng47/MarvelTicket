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
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
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
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
