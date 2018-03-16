const spot = {
  state: {
    // 场馆的基本信息
    spot_basic: {},
    // 默认读取本场馆的座位
    spot_seats_map: [],
    // 默认有多少种座位类型
    cur_seat_type_count: 9,
    // 默认的座位名称
    seat_names: {},
    // store中存的基本信息较之前的是否已经被修改过
    spot_basic_modified: false,
    // store中存的座位表较之前的是否已经被修改过
    spot_seats_map_modified: false
  },

  mutations: {
    SET_SPOT_BASIC: (state, spot_basic) => {
      state.spot_basic = spot_basic
    },
    SET_SPOT_SEATS_MAP: (state, spot_seats_map) => {
      state.spot_seats_map = spot_seats_map
    },
    SET_CUR_SEAT_TYPE_COUNT: (state, cur_seat_type_count) => {
      state.cur_seat_type_count = cur_seat_type_count
    },
    SET_SEAT_NAMES: (state, seat_names) => {
      state.seat_names = seat_names
    },
    SET_POT_BASIC_MODIFIED: (state, bool) => {
      state.spot_basic_modified = bool
    },
    SET_SPOT_SEATS_MAP_MODIFIED: (state, bool) => {
      state.spot_seats_map_modified = bool
    }
  },

  actions: {
    // 提交基本信息
    ChangeSpotBasicInfo({ commit }, spot_basic) {
      commit('SET_SPOT_BASIC', spot_basic)
      commit('SET_POT_BASIC_MODIFIED', true)
    },
    // 提交座位图
    ChangeSpotSeatsMap({ commit }, { spot_seats_map, cur_seat_type_count, seat_names }) {
      commit('SET_SPOT_SEATS_MAP', spot_seats_map)
      commit('SET_CUR_SEAT_TYPE_COUNT', cur_seat_type_count)
      commit('SET_SEAT_NAMES', seat_names)
      commit('SET_SPOT_SEATS_MAP_MODIFIED', true)
    }
  }
}

export default spot
