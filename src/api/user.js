import request from '@/utils/request'
import { computeSeatNameNumMap } from '../utils/seat_chart_helper'

const qs = require('qs')

/**
 * 收藏
 */
export function star(programID) {
  return request({
    url: '/user/star',
    method: 'post',
    data: qs.stringify({ programID: programID })
  })
}
/**
 * 修改密码
 */
export function modifyPassword(token, old_password, new_password) {
  return request({
    url: '/user/modifyPassword',
    method: 'post',
    data: qs.stringify({
      token,
      old_password,
      new_password
    })
  })
}

/**
 * 修改昵称
 */
export function modifyName(name, token) {
  return request({
    url: '/user/modifyName',
    method: 'post',
    data: qs.stringify({ name: name, token: token })
  })
}

/**
 * 修改头像
 */
export function modifyPortrait(portrait, token) {
  return request({
    url: '/user/modifyPortrait',
    method: 'post',
    data: qs.stringify({ portrait: portrait, token: token })
  })
}
/**
 * 获得收藏的节目
 */
export function getStarPrograms() {
  return request({
    url: '/user/getStarPrograms',
    method: 'post'
  })
}

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

/**
 * 用户兑换优惠券
 */
export function couponConvert(token, description, offPrice, neededCredit) {
  return request({
    url: '/user/coupon_convert',
    method: 'post',
    data: qs.stringify({
      token,
      description,
      offPrice,
      neededCredit
    })
  })
}

/**
 * 场馆获取用户信息
 */
export function spotGetMemberInfo(mid) {
  return request({
    url: '/user/spot_get_member_info',
    method: 'post',
    data: qs.stringify({
      mid
    })
  })
}

/**
 * 会员注销
 */
export function memberInvalidate(token) {
  return request({
    url: '/user/member_invalidate',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}

/**
 * 经理获得所有未审批的场馆
 */
export function getUnexaminedSpots(token) {
  return request({
    url: '/user/unexamined_spots',
    method: 'post',
    data: qs.stringify({
      token
    })
  })
}

/**
 * 经理获取场馆信息
 */
export function getSpot(token, spotId) {
  return request({
    url: '/user/spot',
    method: 'post',
    data: qs.stringify({
      token,
      spotId
    })
  })
}

/**
 * 经理获得所有未审批的场馆
 */
export function examineSpot(token, spotId) {
  return request({
    url: '/user/examine',
    method: 'post',
    data: qs.stringify({
      token,
      spotId
    })
  })
}

/**
 * 会员激活
 */
export function memberActivate(activeUrl) {
  return request({
    url: '/user/member_active',
    method: 'post',
    data: qs.stringify({
      activeUrl
    })
  })
}
