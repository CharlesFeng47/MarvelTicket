const getters = {
  // app + user
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,

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
  order_type: state => state.order.order_type,
  // 不选座
  order_num: state => state.order.order_num,
  order_seat_name: state => state.order.order_seat_name,
  order_price: state => state.order.order_price,
  // 选座
  choose_seats: state => state.order.choose_seats,
  choose_seats_count: state => state.order.choose_seats_count,
  order_modified: state => state.order.order_modified,
  // 优惠券和总价
  order_used_coupon: state => state.order.order_used_coupon,
  order_total_price: state => state.order.order_total_price

}
export default getters
