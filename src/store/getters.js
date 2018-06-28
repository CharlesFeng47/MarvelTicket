const getters = {
  // user
  token: state => state.user.token,
  email: state => state.user.email,
  name: state => state.user.name,
  portrait: state => state.user.portrait,

  // 保存用户信息
  message: state => state.user.message,

  // permission
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,

  // schedule
  basic_info_form: state => state.schedule.basic_info_form,
  seat_price_map: state => state.schedule.seat_price_map,
  basic_info_form_modified: state => state.schedule.basic_info_form_modified,
  seat_price_map_modified: state => state.schedule.seat_price_map_modified,

  // spot
  spot_basic: state => state.spot.spot_basic,
  spot_seats_map: state => state.spot.spot_seats_map,
  cur_seat_type_count: state => state.spot.cur_seat_type_count,
  seat_names: state => state.spot.seat_names,
  spot_basic_modified: state => state.spot.spot_basic_modified,
  spot_seats_map_modified: state => state.spot.spot_seats_map_modified,

  // order
  order_detail: state => state.order.order_detail,
  order_type: state => state.order.order_type,
  // 不选座
  order_num: state => state.order.order_num,
  order_seat_name: state => state.order.order_seat_name,
  order_price: state => state.order.order_price,
  // 选座
  choose_seats: state => state.order.choose_seats,
  choose_seats_count: state => state.order.choose_seats_count,
  order_modified: state => state.order.order_modified,
  // 购票方式
  order_way: state => state.order.order_way,
  // 现场购票时的会员情况
  on_spot_is_member: state => state.order.on_spot_is_member,
  on_spot_member_id: state => state.order.on_spot_member_id,
  // 优惠券
  order_did_use_coupon: state => state.order.order_did_use_coupon,
  order_used_coupon: state => state.order.order_used_coupon,
  // 总价相关
  order_cal_process: state => state.order.order_cal_process,
  order_total_price: state => state.order.order_total_price,

  // 当前城市
  cur_city: state => state.home.cur_city,
  show_popover: state => state.home.show_popover
}
export default getters
