import request from '@/utils/request'

const qs = require('qs')

/**
 * 登录
 */
export function login(username, password, userType) {
  return request({
    url: '/login',
    method: 'post',
    data: qs.stringify({
      username,
      password,
      userType
    })
  })
}

/**
 * 会员注册
 */
export function memberSignUp(username, password, email) {
  return request({
    url: '/login/sign_up',
    method: 'post',
    data: qs.stringify({
      username,
      password,
      email
    })
  })
}

/**
 * 通过token定时获取指定用户信息
 */
export function getInfo(token) {
  return request({
    url: '/login/info',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}

/**
 * 登出
 */
export function logout(token) {
  return request({
    url: '/login/logout',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}
