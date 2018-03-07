import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import schedule from './modules/schedule'
import spot from './modules/spot'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    schedule,
    spot
  },
  getters
})

export default store
