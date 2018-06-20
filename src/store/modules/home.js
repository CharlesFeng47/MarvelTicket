const home = {
  state: {
    // 当前城市
    cur_city: '上海'
  },
  getters:{
    // 参数列表state指的是state数据
    getCity: state => {
      return state.cur_city;
    }
  },
  actions: {
    // 用户设置当前城市
    StoreCurCity({ commit,state }, cur_city) {
      commit('SET_CUR_CITY', cur_city.cur_city)
    }
  },
  mutations: {
    SET_CUR_CITY: (state, cur_city) => {
      state.cur_city = cur_city
    }
  }
}

export default home
