const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  basic_info_form: state => state.schedule.basic_info_form,
  seat_price_map: state => state.schedule.seat_price_map
}
export default getters
