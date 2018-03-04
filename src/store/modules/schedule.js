const schedule = {
  state: {
    basic_info_form: {
      name: '',
      date: '',
      time: '',
      type: '',
      description: ''
    }
  },

  mutations: {
    SET_BASIC_INFO: (state, basic_info_form) => {
      state.basic_info_form = basic_info_form
      console.log('now state.basic_info_form: ')
      console.log(state.basic_info_form)
    }
  },

  actions: {
    // 提交基本信息
    ChangeBasicInfo({ commit }, basicInfoForm) {
      commit('SET_BASIC_INFO', basicInfoForm)
    }
  }
}

export default schedule
