import request from '@/utils/request'

const qs = require('qs')

/**
 * 生成订单
 */
export function generateOrder(programID, seatType, programTime, ticketNum, token) {
  return request({
    url: '/order/generateOrder',
    method: 'post',
    data: qs.stringify({ program_id: programID, seat_type: seatType, program_time: programTime, ticket_num: ticketNum, token: token })
  })
}

/**
 * 获取单条计划
 */
export function getOrder(oid, token) {
  return request({
    url: '/order/getOneOrder',
    method: 'post',
    data: qs.stringify({ order_time: oid, token: token })
  })
}
/**
 * 支付订单
 */
export function payOrder(oid, token) {
  return request({
    url: '/order/payOrder',
    method: 'post',
    data: qs.stringify({ order_id: oid, token: token })
  })
}

/**
 * 未支付订单取消
 */
export function cancelOrder(oid, token) {
  return request({
    url: '/order/cancelOrder',
    method: 'post',
    data: qs.stringify({ order_id: oid, token: token })
  })
}
/**
 * 已经支付订单退订
 */
export function unsubscribeOrder(oid, token) {
  return request({
    url: '/order/unsubscribeOrder',
    method: 'post',
    data: qs.stringify({ order_id: oid, token: token })
  })
}

/**
 * 获取类型的所有计划
 */
export function getMyOrders(type, token) {
  return request({
    url: '/order/getMyOrdersByState',
    method: 'post',
    data: qs.stringify({ order_type: type, token: token })
  })
}

/**
 * 保存单条计划
 */
export function saveOrder(token, scheduleId, order_type, order_num, order_seat_name, order_price, choose_seats, choose_seats_count, order_way, on_spot_is_member, on_spot_member_id, order_did_use_coupon, order_used_coupon, order_cal_process, order_total_price) {
  // 不订座的信息处理
  var not_chose_seats = {}
  not_chose_seats.seatName = order_seat_name
  not_chose_seats.num = order_num
  not_chose_seats.price = order_price
  console.log(not_chose_seats)

  // 订座的信息处理
  var choose_seat_array = []
  if (order_type === 'CHOOSE_SEATS') {
    if (choose_seats_count !== '') {
      for (var i = 0; i < choose_seats_count; i++) {
        choose_seat_array[i] = {}
        choose_seat_array[i].id = choose_seats[i].settings.id
        choose_seat_array[i].seatName = choose_seats[i].data().category
        choose_seat_array[i].price = choose_seats[i].data().price
      }
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
        choose_seats_json: JSON.stringify(choose_seat_array),
        order_way,
        on_spot_is_member,
        on_spot_member_id,
        order_did_use_coupon,
        order_used_coupon: JSON.stringify(order_used_coupon),
        order_cal_process,
        order_total_price
      })
  })
}

/**
 * 订单付款
 */
export function payOrder2(token, oid, payment_id, payment_pwd) {
  return request({
    url: '/order/pay',
    method: 'post',
    data:
      qs.stringify({
        // 用于获取此会员用户
        token,
        oid,
        payment_id,
        payment_pwd
      })
  })
}

/**
 * 订单退订
 */
export function unsubscribe(token, oid, payment_id) {
  return request({
    url: '/order/unsubscribe',
    method: 'post',
    data:
      qs.stringify({
        // 用于获取此会员用户
        token,
        oid,
        payment_id
      })
  })
}

/**
 * 订单检票登记
 */
export function checkTicket(token, oid) {
  return request({
    url: '/order/check_ticket',
    method: 'post',
    data:
      qs.stringify({
        // 用于获取此会员用户
        token,
        oid
      })
  })
}
