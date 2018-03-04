import request from '@/utils/request'

const qs = require('qs')

/**
 * 获取单个用户
 */
export function getUser(token) {
  return request({
    url: '/user',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}

