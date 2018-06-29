import Vue from 'vue'

// 使axios每次访问服务器的session是一个
import axios from 'axios'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

// 将全局函数当做插件来进行注册
import charts from './utils/seat-charts'
Vue.use(charts)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
