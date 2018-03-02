import request from '@/utils/request'

export function getSchedule(scheduleId) {
  return request({
    url: '/schedule/' + scheduleId,
    method: 'get'
  })
}

export function getAllSchedules() {
  return request({
    url: '/schedule/all',
    method: 'get'
  })
}

export function getSchedulesOfOneSpot(spotId) {
  return request({
    url: '/schedule/all?spotId=' + spotId,
    method: 'get'
  })
}
