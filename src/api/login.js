import request from '@/utils/request'

const qs = require('qs')

/**
 * 登录
 */
export function login(email, password) {
  return request({
    url: '/user/user_login',
    method: 'post',
    data: qs.stringify({
      email,
      password
    })
  })
}


/**
 * 会员注册
 */
export function signUp(email, username, password) {
  return request({
    url: '/user/user_sign_up',
    method: 'post',
    data: qs.stringify({
      email,
      username,
      password
    })
  })
}

/**
 * 通过token定时获取指定用户信息
 */
export function getInfo(token) {
  return request({
    url: '/user/token',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}

/**
 * 登出
 */
export function logout(token) {
  return request({
    url: '/user/logout',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}
