import request from '@/utils/request'

const qs = require('qs')

/**
 * 统计交易信息
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

/**
 * 统计订单信息
 */
export function getOrderStatistics(token) {
  return request({
    url: '/statistics/orders',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}
