import request from '@/utils/request'

export function getSchedule(scheduleId) {
  return request({
    // url: 'http://localhost:3000/TicketsManagementSystem/test',
    url: '/schedule/' + scheduleId,
    method: 'get'
  })
}
