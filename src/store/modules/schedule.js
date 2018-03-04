const schedule = {
  state: {
    basic_info_form: {
      name: '',
      date: '',
      time: '',
      type: '',
      description: ''
    },
    // 默认读取本场馆的座位
    seat_price_map: []
  },

  mutations: {
    SET_BASIC_INFO: (state, basic_info_form) => {
      state.basic_info_form = basic_info_form
      console.log('now state.basic_info_form: ')
      console.log(state.basic_info_form)
    },
    SET_SEAT_PRICE_MAP: (state, seat_price_map) => {
      state.seat_price_map = seat_price_map
    }
  },

  actions: {
    // 提交基本信息
    ChangeBasicInfo({ commit }, basicInfoForm) {
      commit('SET_BASIC_INFO', basicInfoForm)
    },
    // 提交座位价格对应表
    ChangeSeatPriceMap({ commit }, seatPriceMap) {
      commit('SET_SEAT_PRICE_MAP', seatPriceMap)
    }
  }
}

export default schedule
