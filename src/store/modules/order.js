const order = {
  state: {
    // 保存生成订单时所有的信息
    order_detail: {},
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

    // 会员购票／场馆现场购票
    order_way: 'BUY_ON_MEMBER',
    // 场馆现场购票是否使用会员编号
    on_spot_is_member: false,
    // 场馆现场购票使用的会员编号
    on_spot_member_id: '',

    // 订单中是否使用优惠券
    order_did_use_coupon: false,
    // 订单中使用的优惠券
    order_used_coupon: '',

    // 订单计算过程
    order_cal_process: '',
    // 订单最终总价
    order_total_price: 0
  },

  mutations: {
    SET_ORDER: (state, order_detail) => {
      state.order_detail = order_detail

      // 存入 localStorage 以免刷新后 vuex 也被刷新，数据消失
      window.localStorage.setItem('order_detail', JSON.stringify(state.order_detail))
    },
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
    SET_ORDER_WAY: (state, order_way) => {
      state.order_way = order_way
    },
    SET_ON_SPOT_IS_MEMBER: (state, on_spot_is_member) => {
      state.on_spot_is_member = on_spot_is_member
    },
    SET_ON_SPOT_MEMBER_ID: (state, on_spot_member_id) => {
      state.on_spot_member_id = on_spot_member_id
    },
    SET_ORDER_DID_USE_COUPON: (state, order_did_use_coupon) => {
      state.order_did_use_coupon = order_did_use_coupon
    },
    SET_ORDER_USED_COUPON: (state, order_used_coupon) => {
      state.order_used_coupon = order_used_coupon
    },
    SET_CAL_PROCESS: (state, order_cal_process) => {
      state.order_cal_process = order_cal_process
    },
    SET_ORDER_TOTAL_PRICE: (state, order_total_price) => {
      state.order_total_price = order_total_price
    }
  },

  actions: {
    // 提交立即选座的座位信息
    StoreOrderDetail({ commit }, { order_detail }) {
      commit('SET_ORDER', order_detail)
    },
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
    StoreCoupon({ commit }, { order_did_use_coupon, order_used_coupon, order_cal_process, order_total_price }) {
      commit('SET_ORDER_DID_USE_COUPON', order_did_use_coupon)
      commit('SET_ORDER_USED_COUPON', order_used_coupon)
      commit('SET_CAL_PROCESS', order_cal_process)
      commit('SET_ORDER_TOTAL_PRICE', order_total_price)
    },
    // 提交会员信息
    StoreMemberInfo({ commit }, { on_spot_is_member, on_spot_member_id }) {
      commit('SET_ORDER_WAY', 'BUY_ON_SPOT')
      commit('SET_ON_SPOT_IS_MEMBER', on_spot_is_member)
      commit('SET_ON_SPOT_MEMBER_ID', on_spot_member_id)
    },

    // 将从后端下载下来的值存进store
    StoreDownloadedData({ commit }, { order_type, order_num, order_seat_name, order_price, choose_seats, choose_seats_count, order_way, order_did_use_coupon, order_used_coupon, order_cal_process, order_total_price }) {
      commit('SET_ORDER_TYPE', order_type)
      commit('SET_ORDER_NUM', order_num)
      commit('SET_ORDER_SEAT_NAME', order_seat_name)
      commit('SET_CHOOSE_SEATS', choose_seats)
      commit('SET_CHOOSE_SEATS_COUNT', choose_seats_count)
      commit('SET_ORDER_PRICE', order_price)
      commit('SET_ORDER_WAY', order_way)
      commit('SET_ORDER_DID_USE_COUPON', order_did_use_coupon)
      commit('SET_ORDER_USED_COUPON', order_used_coupon)
      commit('SET_CAL_PROCESS', order_cal_process)
      commit('SET_ORDER_TOTAL_PRICE', order_total_price)
    },

    // 每次购买之前需要重置数据
    ResetOrder({ commit }) {
      commit('SET_ORDER_TYPE', '')
      commit('SET_ORDER_NUM', '')
      commit('SET_ORDER_SEAT_NAME', '')
      commit('SET_CHOOSE_SEATS', [])
      commit('SET_CHOOSE_SEATS_COUNT', '')
      commit('SET_ORDER_PRICE', '')
      commit('SET_ORDER_DID_USE_COUPON', false)
      commit('SET_ORDER_USED_COUPON', '')
      commit('SET_ORDER_TOTAL_PRICE', 0)
      commit('SET_ORDER_MODIFIED', false)
      commit('SET_ORDER_WAY', 'BUY_ON_MEMBER')
      commit('SET_ON_SPOT_IS_MEMBER', false)
      commit('SET_ON_SPOT_MEMBER_ID', '')
    }
  }
}

export default order
