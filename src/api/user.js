import request from '@/utils/request'
import { computeSeatNameNumMap } from '../utils/seat_chart_helper'

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

/**
 * 会员修改数据
 */
export function memberModify(token, pwd) {
  return request({
    url: '/user/member_modify',
    method: 'post',
    data: qs.stringify({
      token,
      pwd
    })
  })
}

/**
 * 场馆修改数据
 */
export function spotModify(token, spot_basic, spot_seats_map, cur_seat_type_count, seat_names) {
  const seatInfos = computeSeatNameNumMap(cur_seat_type_count, spot_seats_map, seat_names)
  console.log(seatInfos)

  return request({
    url: '/user/spot_modify',
    method: 'post',
    data: qs.stringify({
      token,
      password: spot_basic.password,
      name: spot_basic.name,
      site: spot_basic.site,
      alipayId: spot_basic.alipayId,
      seatInfos: JSON.stringify(seatInfos),
      seatsMap: JSON.stringify(spot_seats_map),
      curSeatTypeCount: cur_seat_type_count
    })
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
