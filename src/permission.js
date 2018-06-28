import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { getInfo } from './api/login'

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    // 已登录，拉取用户信息

    new Promise((resolve, reject) => {
      getInfo(getToken()).then(response => {
        if (response.state === 'OK') {
          const curUser = JSON.parse(response.object)

          // 当前信息仍有效，更新前端信息
          store.dispatch('StoreInfo', {
            email: curUser.email,
            name: curUser.name,
            portrait: curUser.portrait
          }).then(res => {
            // TODO 加入异步路由
            // const data = JSON.parse(res.object)
            // store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            //   console.log(router)
            //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            // })
          })
        } else {
          // TODO 登录失败
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({path: '/login'})
          })
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    }).then()

    next()
  } else {
    // 未登录
    // if (to.path.startsWith('/member_active') || to.path.startsWith('/detail')) {
    //   next()
    // } else {
    //   if (whiteList.indexOf(to.path) !== -1) {
    //     // 可直接白名单的网址
    //     next()
    //   } else {
    //     next('/home')
    //   }
    // }
    next()
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
