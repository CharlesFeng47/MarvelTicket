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
export function getOrdersStatistics(token) {
  return request({
    url: '/statistics/orders',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}

/**
 * 经理统计场馆情况
 */
export function getSpotsStatistics(token) {
  return request({
    url: '/statistics/spots',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}

/**
 * 经理统计会员等级情况
 */
export function getMemberLevelStatistics(token) {
  return request({
    url: '/statistics/member_level',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}

/**
 * 经理统计会员订单情况
 */
export function getMemberOrderStatistics(token) {
  return request({
    url: '/statistics/member_order',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}
