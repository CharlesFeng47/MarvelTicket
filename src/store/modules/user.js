import { login, signUp, spotSignUp, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    email: '',
    name: '',
    portrait: '',
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PORTRAIT: (state, portrait) => {
      state.portrait = portrait
    }
  },

  actions: {
    // 登录
    Login({ commit }, { token }) {
      commit('SET_TOKEN', token)

      // 保存到 Cookie 中
      setToken(token)
    },

    // vuex 保存用户信息
    StoreInfo({ commit }, { email, name, portrait }) {
      commit('SET_EMAIL', email)
      commit('SET_NAME', name)
      commit('SET_PORTRAIT', portrait)
    },

    // 更新昵称
    UpdateName({ commit}, name) {
      commit('SET_NAME', name)
    },

    // 更新头像
    UpdatePortrait({ commit}, portrait) {
      commit('SET_PORTRAIT', portrait)
    },

    // 会员登出
    LogOut({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_EMAIL', '')
      commit('SET_NAME', '')
      commit('SET_PORTRAIT', '')

      //  Cookie 中删除，保证安全
      removeToken()
    },

    // 前端手动登出
    FedLogOut({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_EMAIL', '')
      commit('SET_NAME', '')
      commit('SET_PORTRAIT', '')

      //  Cookie 中删除，保证安全
      removeToken()
    }
  }
}

export default user
