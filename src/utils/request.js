import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(

  // 请求成功直接返回后端的结果
  response => {
    return response.data
  },

  // 请求错误回返回 400 状态码
  error => {
    console.log('err: ')
    console.log(error.response)
    // console.log('err code' + error.code)
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000,
      center: true,
      showClose: true
    })
    return Promise.reject(error.response.data)
  }
)

export default service
