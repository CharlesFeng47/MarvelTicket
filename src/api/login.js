import request from '@/utils/request'
import { computeSeatNameNumMap } from '../utils/seat_chart_helper'

const qs = require('qs')

/**
 * 登录
 */
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

/**
 * 会员注册
 */
export function memberSignUp(username, password, email) {
  return request({
    url: '/login/member_sign_up',
    method: 'post',
    data: qs.stringify({
      username,
      password,
      email
    })
  })
}

/**
 * 场馆注册
 */
export function spotSignUp(spot_basic, spot_seats_map, cur_seat_type_count, seat_names) {
  const seatInfos = computeSeatNameNumMap(cur_seat_type_count, spot_seats_map, seat_names)
  console.log(seatInfos)

  return request({
    url: '/login/spot_sign_up',
    method: 'post',
    data: qs.stringify({
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
 * 通过token定时获取指定用户信息
 */
export function getInfo(token) {
  return request({
    url: '/login/info',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}

/**
 * 登出
 */
export function logout(token) {
  return request({
    url: '/login/logout',
    method: 'post',
    data: qs.stringify({ token: token })
  })
}
