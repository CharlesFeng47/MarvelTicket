import request from '@/utils/request'

export function getSchedule(scheduleId) {
  return request({
    url: '/schedule/' + scheduleId,
    method: 'get'
  })
}
