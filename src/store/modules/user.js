import { login, signUp, spotSignUp, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    email: '',
    name: '',
    portrait: '',

    //TODO
    message: {}
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
    },

    // TODO
    SET_MESSAGE: (state, message) => {
      state.message = message
    }
  },

  actions: {
    // 设置用户的信息
    SetMessage({ commit }, { message }) {
      // console.log(obj.message)
      commit('SET_MESSAGE', message)
    },
    // 登录
    Login({ commit }, { token }) {
      commit('SET_TOKEN', token)

      // 保存到 Cookie 中
      setToken(token)
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      //    TODO fjj
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          if (response.state === 'OK') {
            const data = JSON.parse(response.object)
            // console.log(data)
            commit('SET_NAME', data.user.id)
            // 场馆多一个是否已被审核通过的属性
            // if (data.role[0] === 'SPOT') commit('SET_SPOT_EXAMINED', data.examined)
            // commit('SET_AVATAR', data.avatar)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
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
