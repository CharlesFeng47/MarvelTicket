const home = {
  state: {
    // 当前城市
    cur_city: '上海'
  },

  mutations: {
    SET_CUR_CITY: (state, cur_city) => {
      state.cur_city = cur_city
    }
  },

  actions: {
    // 用户设置当前城市
    StoreCurCity({ commit }, cur_city) {
      commit('SET_CUR_CITY', cur_city)
    }
  }
}

export default home
