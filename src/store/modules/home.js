const home = {
  state: {
    // 当前城市
    cur_city: '上海',
    show_popover: false
  },
  mutations: {
    SET_CUR_CITY: (state, cur_city) => {
      state.cur_city = cur_city
    },
    SET_POPOVER: (state, popover_state) => {
      state.show_popover = popover_state
    }
  },
  actions: {
    // 用户设置当前城市
    StoreCurCity({ commit,state }, cur_city) {
      commit('SET_CUR_CITY', cur_city.cur_city)
    },
    HidePopover({ commit }) {
      commit('SET_POPOVER', false)
    },
    ShowPopover({ commit }) {
      commit('SET_POPOVER', true)
    }
  }
}

export default home
