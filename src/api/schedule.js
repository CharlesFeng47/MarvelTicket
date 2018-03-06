import request from '@/utils/request'

const qs = require('qs')

/**
 * 获取单条计划
 */
export function getSchedule(scheduleId) {
  return request({
    url: '/schedule/' + scheduleId,
    method: 'get'
  })
}

/**
 * 获取所有计划
 */
export function getAllSchedules() {
  return request({
    url: '/schedule/all',
    method: 'get'
  })
}

/**
 * 获取单个场馆的所有计划
 */
export function getSchedulesOfOneSpot(spotId) {
  return request({
    url: '/schedule/all?spotId=' + spotId,
    method: 'get'
  })
}

/**
 * 删除单条计划
 */
export function deleteSchedule(scheduleId) {
  return request({
    url: '/schedule/delete',
    method: 'post',
    data:
      qs.stringify({
        scheduleId: scheduleId
      })
  })
}

/**
 * 保存单条计划
 */
export function saveSchedule(token, basic_info_form, seat_price_map) {
  const curDate = basic_info_form.date
  const dateStr = curDate.getFullYear() + '-' + curDate.getMonth() + '-' + curDate.getDate()

  const curTime = basic_info_form.time
  const timeStr = curTime.getHours() + ':' + curTime.getMinutes() + ':' + curTime.getSeconds()

  const length = seat_price_map.length
  var nameList = []
  var priceList = []
  for (var i = 0; i < length; i++) {
    nameList[i] = seat_price_map[i].seatName
    priceList[i] = seat_price_map[i].seatPrice
  }

  return request({
    url: '/schedule/save',
    method: 'post',
    data:
      qs.stringify({
        // 用于获取此场馆用户
        token: token,
        name: basic_info_form.name,
        dateStr: dateStr,
        timeStr: timeStr,
        type: basic_info_form.type,
        description: basic_info_form.description,
        nameListStr: JSON.stringify(nameList),
        priceListStr: JSON.stringify(priceList)
      })
  })
}
