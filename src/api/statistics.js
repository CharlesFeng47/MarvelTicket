import request from '@/utils/request'

const qs = require('qs')

/**
 * 登录
 */
export function getConsumption(token) {
  return request({
    url: '/statistics/consumption',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}
