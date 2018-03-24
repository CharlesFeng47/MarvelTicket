import request from '@/utils/request'

const qs = require('qs')

/**
 * 获取单条计划
 * TODO newSchedule/step1 和 newSchedule/step2 均调用了此方法，可抽象出来在 newSchedule/index 中调用（参考 newOrder/index）
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
 * 结算单条计划
 */
export function settleSchedule(token, scheduleId) {
  return request({
    url: '/schedule/settle',
    method: 'post',
    data:
      qs.stringify({
        token,
        scheduleId
      })
  })
}

/**
 * 保存单条计划
 */
export function saveSchedule(token, basic_info_form, seat_price_map) {
  const dateStrAndTimeStr = getDateStrAndTimeStr(basic_info_form.date, basic_info_form.time)

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
        dateStr: dateStrAndTimeStr[0],
        timeStr: dateStrAndTimeStr[1],
        type: basic_info_form.type,
        description: basic_info_form.description,
        nameListStr: JSON.stringify(nameList),
        priceListStr: JSON.stringify(priceList)
      })
  })
}

/**
 * 修改单条计划
 */
export function modifySchedule(token, scheduleId, basic_info_form, seat_price_map) {
  const dateStrAndTimeStr = getDateStrAndTimeStr(basic_info_form.date, basic_info_form.time)

  const length = seat_price_map.length
  var nameList = []
  var priceList = []
  for (var i = 0; i < length; i++) {
    nameList[i] = seat_price_map[i].seatName
    priceList[i] = seat_price_map[i].seatPrice
  }

  return request({
    url: '/schedule/modify',
    method: 'post',
    data:
      qs.stringify({
        // 用于获取此场馆用户
        token: token,
        scheduleId: scheduleId,
        name: basic_info_form.name,
        dateStr: dateStrAndTimeStr[0],
        timeStr: dateStrAndTimeStr[1],
        type: basic_info_form.type,
        description: basic_info_form.description,
        nameListStr: JSON.stringify(nameList),
        priceListStr: JSON.stringify(priceList)
      })
  })
}

/**
 * 将JS的date类型转化为需要的datetime string返回
 */
function getDateStrAndTimeStr(date, time) {
  const curDate = date
  const dateStr = curDate.getFullYear() + '-' + (curDate.getMonth() + 1) + '-' + curDate.getDate()

  const curTime = time
  const timeStr = curTime.getHours() + ':' + curTime.getMinutes() + ':' + curTime.getSeconds()

  return [dateStr, timeStr]
}
