const home = {
  state: {
    // 当前城市
    cur_city: '上海',
    show_popover: false
  },
  getters:{
    // 参数列表state指的是state数据
    getCity: state => {
      return state.cur_city;
    },
    getIsShow : state => {
      return state.show_popover
    }
  },
  actions: {
    // 用户设置当前城市
    StoreCurCity({ commit,state }, cur_city) {
      commit('SET_CUR_CITY', cur_city.cur_city)
    },
    HidePopover({commit, state}) {
      commit('HIDE_POPOVER')
    },
    ShowPopover({commit, state}) {
      commit('SHOW_POPOVER')
    }
  },
  mutations: {
    SET_CUR_CITY: (state, cur_city) => {
      state.cur_city = cur_city
    },
    HIDE_POPOVER: (state)=>{
      state.show_popover = false
    },
    SHOW_POPOVER: (state)=>{
      state.show_popover = true
    }
  }
}

export default home
