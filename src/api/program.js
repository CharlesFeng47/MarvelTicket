import request from '@/utils/request'

const qs = require('qs')

/**
 * 获取单条计划
 */
export function recommend(city) {
  return request({
    url: '/program/recommend/?city=' + city,
    method: 'get'
  })
}

