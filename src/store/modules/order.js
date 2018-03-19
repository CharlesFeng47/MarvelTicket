const order = {
  state: {
    // 选择的订票类型
    order_type: '',

    // 立即购买不选座时购买的票数
    order_num: '',
    // 立即购买不选座时购买的座位类型
    order_seat_name: '',

    // 选择的座位id列表
    choose_seats: [],
    // 选择的座位个数
    choose_seats_count: '',

    // 订单的基本价格（未打折、未使用优惠券）
    order_price: '',

    // store中存的order订票信息较之前的是否已经被修改过
    order_modified: false,

    // 订单中是否使用优惠券
    order_did_use_coupon: false,
    // 订单中使用的优惠券Id
    order_used_coupon: '',
    // 订单最终总价
    order_total_price: 0
  },

  mutations: {
    SET_ORDER_TYPE: (state, order_type) => {
      state.order_type = order_type
    },
    SET_ORDER_NUM: (state, order_num) => {
      state.order_num = order_num
    },
    SET_ORDER_SEAT_NAME: (state, order_seat_name) => {
      state.order_seat_name = order_seat_name
    },
    SET_ORDER_PRICE: (state, order_price) => {
      state.order_price = order_price
    },
    SET_CHOOSE_SEATS: (state, choose_seats) => {
      state.choose_seats = choose_seats
    },
    SET_CHOOSE_SEATS_COUNT: (state, choose_seats_count) => {
      state.choose_seats_count = choose_seats_count
    },
    SET_ORDER_MODIFIED: (state, bool) => {
      state.order_modified = bool
    },
    SET_ORDER_DID_USE_COUPON: (state, order_did_use_coupon) => {
      state.order_did_use_coupon = order_did_use_coupon
    },
    SET_ORDER_USED_COUPON: (state, order_used_coupon) => {
      state.order_used_coupon = order_used_coupon
    },
    SET_ORDER_TOTAL_PRICE: (state, order_total_price) => {
      state.order_total_price = order_total_price
    }
  },

  actions: {
    // 提交立即选座的座位信息
    StoreMemberChooseSeats({ commit }, { choose_seats, choose_seats_count, order_price }) {
      commit('SET_ORDER_TYPE', 'CHOOSE_SEATS')
      commit('SET_CHOOSE_SEATS', choose_seats)
      commit('SET_CHOOSE_SEATS_COUNT', choose_seats_count)
      commit('SET_ORDER_PRICE', order_price)
      commit('SET_ORDER_MODIFIED', true)
    },
    // 提交立即购买不选座的购买数量
    StoreNotChooseSeats({ commit }, { order_num, order_seat_name, order_price }) {
      commit('SET_ORDER_TYPE', 'NOT_CHOOSE_SEATS')
      commit('SET_ORDER_NUM', order_num)
      commit('SET_ORDER_SEAT_NAME', order_seat_name)
      commit('SET_ORDER_PRICE', order_price)
      commit('SET_ORDER_MODIFIED', true)
    },
    // 提交选择的优惠券信息
    StoreCoupon({ commit }, { order_did_use_coupon, order_used_coupon, order_total_price }) {
      commit('SET_ORDER_DID_USE_COUPON', order_did_use_coupon)
      commit('SET_ORDER_USED_COUPON', order_used_coupon)
      commit('SET_ORDER_TOTAL_PRICE', order_total_price)
    },

    StoreUploadedData({ commit }, { order_type, order_num, order_seat_name, order_price, choose_seats, choose_seats_count }) {
      commit('SET_ORDER_TYPE', order_type)
      commit('SET_ORDER_NUM', order_num)
      commit('SET_ORDER_SEAT_NAME', order_seat_name)
      commit('SET_ORDER_PRICE', order_price)
      commit('SET_CHOOSE_SEATS', choose_seats)
      commit('SET_CHOOSE_SEATS_COUNT', choose_seats_count)
    }
  }
}

export default order
