const schedule = {
  state: {
    // 场馆的基本信息
    spot_basic: {},
    // 默认读取本场馆的座位
    spot_seats_map: []
  },

  mutations: {
    SET_SPOT_BASIC: (state, spot_basic) => {
      state.spot_basic = spot_basic
    },
    SET_SPOT_SEATS_MAP: (state, spot_seats_map) => {
      state.spot_seats_map = spot_seats_map
    }
  },

  actions: {
    // 提交基本信息
    ChangeBasicInfo({ commit }, spot_basic) {
      console.log(spot_basic)
      commit('SET_SPOT_BASIC', spot_basic)
    },
    // 提交座位表
    ChangeSeatPriceMap({ commit }, spot_seats_map) {
      console.log(spot_seats_map)
      commit('SET_SPOT_SEATS_MAP', spot_seats_map)
    }
  }
}

export default schedule
