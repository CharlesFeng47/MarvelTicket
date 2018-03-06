import { login, memberSignUp, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    name: '',
    // avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    // SET_AVATAR: (state, avatar) => {
    //   state.avatar = avatar
    // },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.userType).then(response => {
          if (response.state === 'OK') {
            const token = JSON.parse(response.object)
            setToken(token)
            commit('SET_TOKEN', token)
            // 因为是根据token再使用GetInfo()获取的用户编号，但是因为一开始刚登录还未根据token去获取，所以先设置一下。。
            commit('SET_NAME', username)
            console.log('login finish')
          } else if (response.state === 'USER_NOT_EXIST') {
            var errorMsg
            switch (userInfo.userType) {
              case 'member':
                errorMsg = '此会员名还未被注册，请先注册哦～'
                break
              case 'spot':
                errorMsg = '此场馆名还未被注册，快来加入我们吧～'
                break
              case 'manager':
                errorMsg = '此管理员不存在！'
                break
            }
            Message({
              message: errorMsg,
              type: 'error',
              duration: 3 * 1000,
              center: true,
              showClose: true
            })
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 注册
    MemberSignUp({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        memberSignUp(username, userInfo.password, userInfo.email).then(response => {
          if (response.state === 'OK') {
            const token = JSON.parse(response.object)
            setToken(token)
            commit('SET_TOKEN', token)
            // 因为是根据token再使用GetInfo()获取的用户编号，但是因为一开始刚登录还未根据token去获取，所以先设置一下。。
            commit('SET_NAME', username)
            console.log('sign_up finish')
          } else if (response.state === 'USER_HAS_BEEN_SIGN_UP') {
            Message({
              message: '此会员名已被注册',
              type: 'error',
              duration: 3 * 1000,
              center: true,
              showClose: true
            })
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          if (response.state === 'OK') {
            const data = JSON.parse(response.object)
            console.log(data)
            commit('SET_ROLES', data.role)
            commit('SET_NAME', data.user.id)
            // commit('SET_AVATAR', data.avatar)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(response => {
          if (response.state === 'OK') {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_NAME', '')
            removeToken()
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
