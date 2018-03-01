import request from '@/utils/request'

var qs = require('qs')

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

export function getInfo(token) {
  return request({
    url: '/login/info',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}

export function logout(token) {
  return request({
    url: '/login/logout',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}
