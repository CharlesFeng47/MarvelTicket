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
 * 删除单挑计划
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
