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
 * 场馆修改数据
 */
export function spotModify(spotId, spot_basic, spot_seats_map, cur_seat_type_count, seat_names) {
  const seatInfos = computeSeatNameNumMap(cur_seat_type_count, spot_seats_map, seat_names)
  console.log(seatInfos)

  return request({
    url: '/user/spot_modify',
    method: 'post',
    data: qs.stringify({
      id: spotId,
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
