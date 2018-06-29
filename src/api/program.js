import request from '@/utils/request'

const qs = require('qs')

/**
 * 获取首页推荐
 */
export function recommend(city) {
  return request({
    url: '/program/recommend?city=' + city,
    method: 'get'
  })
}


/**
 * 获取该类型的所有节目
 */
export function getProgramsByType(city, type) {
  return request({
    url: '/program/getProgramsByType?city=' + city + '&program_type=' + type,
    method: 'get'
  })
}

/**
 * 获取该关键字相关的所有节目
 */
export function getProgramsBySearchKey(key) {
  return request({
    url: '/program/search?conditions=' + key,
    method: 'get'
  })
}

/**
 * 模糊搜索
 */
export function previewSearch(condition) {
  return request({
    url: '/program/previewSearch?conditions=' + condition,
    method: 'get'
  })
}


/**
 * 获取该节目详情
 */
export function getProgramDetail(programId) {
  console.log(programId)
  return request({
    url: '/program/getProgramDetail?program_id=' + programId,
    method: 'get'
  })
}

/**
 * 获取当前用户是否已经喜欢过该节目
 */
export function hasStarredCurProgram(program_id, token) {
  return request({
    url: '/program/isLikeProgram',
    method: 'post',
    data: qs.stringify({
      program_id,
      token
    })
  })
}

