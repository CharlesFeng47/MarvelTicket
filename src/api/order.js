import request from '@/utils/request'

const qs = require('qs')

/**
 * 获取单条计划
 */
export function getOrder(oid) {
  return request({
    url: '/order/' + oid,
    method: 'get'
  })
}

/**
 * 获取所有计划
 */
export function getMyOrders(mid) {
  return request({
    url: '/order/all?mid=' + mid,
    method: 'get'
  })
}

/**
 * 保存单条计划
 */
export function saveOrder(token, scheduleId, order_type, order_num, order_seat_name, order_price, choose_seats, choose_seats_count) {
  // 不订座的信息处理
  var not_chose_seats = {}
  not_chose_seats.seatName = order_seat_name
  not_chose_seats.num = order_num
  not_chose_seats.price = order_price
  console.log(not_chose_seats)

  // 订座的信息处理
  var choose_seat_array = []
  if (choose_seats_count !== '') {
    for (var i = 0; i < choose_seats_count; i++) {
      choose_seat_array[i] = {}
      choose_seat_array[i].id = choose_seats[i].settings.id
      choose_seat_array[i].seatName = choose_seats[i].data().category
      choose_seat_array[i].price = choose_seats[i].data().price
    }
  }

  return request({
    url: '/order/save',
    method: 'post',
    data:
      qs.stringify({
        // 用于获取此会员用户
        token,
        scheduleId,
        order_type,
        not_chose_seats: JSON.stringify(not_chose_seats),
        choose_seats_json: JSON.stringify(choose_seat_array)
      })
  })
}
