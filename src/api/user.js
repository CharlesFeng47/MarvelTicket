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
      seatInfos: JSON.stringify(seatInfos),
      seatsMap: JSON.stringify(spot_seats_map),
      curSeatTypeCount: cur_seat_type_count
    })
  })
}

/**
 * 获取场馆信息
 */
export function getSpot(scheduleId) {
  return request({
    url: '/user/spot?scheduleId=' + scheduleId,
    method: 'get'
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
