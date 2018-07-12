import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth' // 验权
import { getInfo } from './api/login'
import { Message } from 'element-ui'

const permissionList = ['/orderConfirm', '/pay', '/paySuccess', '/center/manage/order', '/center/manage/like',
  '/center/manage/message']
const loginList = ['/loginAndRegister/login', '/loginAndRegister/register']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path.startsWith('/member_active')) {
    // 邮箱验证可直接访问
    next()
  } else {
    if (getToken()) {
      // 已登录，拉取用户信息
      console.log('已登录')

      new Promise((resolve, reject) => {
        console.log('INTO 获取')
        getInfo(getToken()).then(curUser => {
          // 当前信息仍有效，更新前端信息
          store.dispatch('StoreInfo', {
            email: curUser.email,
            name: curUser.username,
            portrait: curUser.portrait
          }).then(res => {
            // TODO 加入异步路由
            // const data = JSON.parse(res.object)
            // store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            //   console.log(router)
            //   next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            // })
            console.log('FINISH 获取')
          })
          resolve()
        }).catch(error => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()
          })
        })
      }).then()

      next()
    } else {
      // 未登录
      if (permissionList.indexOf(to.path) !== -1) {
        // 不可在未登录下直接访问的网址
        next( '/loginAndRegister/login')
        Message({
          message: '登录后才可以访问哦～已跳转至登录界面～',
          type: 'error',
          duration: 5 * 1000,
          center: true,
          showClose: true
        })
      } else {
        if (loginList.indexOf(to.path) == -1) {
          window.localStorage.setItem('href', window.location.href)
        }
        next()
      }
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
