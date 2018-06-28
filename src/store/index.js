import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import schedule from './modules/schedule'
import spot from './modules/spot'
import permission from './modules/permission'
import order from './modules/order'

import home from './modules/home'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    schedule,
    spot,
    permission,
    order,
    home
  },
  getters
})

export default store
