const schedule = {
  state: {
    // 默认的基本信息
    basic_info_form: {},
    // 默认读取本场馆的座位
    seat_price_map: [],
    // store中存的基本信息较之前的是否已经被修改过
    basic_info_form_modified: false,
    // store中存的座位表较之前的是否已经被修改过
    seat_price_map_modified: false
  },

  mutations: {
    SET_BASIC_INFO: (state, basic_info_form) => {
      state.basic_info_form = basic_info_form
    },
    SET_SEAT_PRICE_MAP: (state, seat_price_map) => {
      state.seat_price_map = seat_price_map
    },
    SET_BASIC_INFO_MODIFIED: (state, bool) => {
      state.basic_info_form_modified = bool
    },
    SET_SEAT_PRICE_MAP_MODIFIED: (state, bool) => {
      state.seat_price_map_modified = bool
    }
  },

  actions: {
    // 提交基本信息
    ChangeBasicInfo({ commit }, basicInfoForm) {
      commit('SET_BASIC_INFO', basicInfoForm)
      commit('SET_BASIC_INFO_MODIFIED', true)
    },
    // 提交座位价格对应表
    ChangeSeatPriceMap({ commit }, seatPriceMap) {
      commit('SET_SEAT_PRICE_MAP', seatPriceMap)
      commit('SET_SEAT_PRICE_MAP_MODIFIED', true)
    },
    // 重置schedule的存储
    ResetSchedule({ commit }) {
      commit('SET_BASIC_INFO_MODIFIED', false)
      commit('SET_SEAT_PRICE_MAP_MODIFIED', false)
    }
  }
}

export default schedule
