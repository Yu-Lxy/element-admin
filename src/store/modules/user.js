import Vue from 'vue'
import { login, logout, getInfo, resetPassword } from '@/service/index'
import { resetRouter, constantRouterMap } from '@/router'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const state = {
  userId: '',
  token: '',
  name: '',
  avatar: '',
  roles: [],
  buttons: [], // 按钮权限
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  RECORD_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  },
  SET_BUTTONS: (state, buttons) => {
    state.buttons = buttons
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  }
}

const actions = {
  // 登录
  Login ({commit}, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(res => {
          if (res.event !== 0) {
            reject(res)
          }
          Vue.ls.set(ACCESS_TOKEN, res.data.token, 12 * 60 * 60 * 1000)
          commit('SET_TOKEN', res.data.token)
          resolve()
        })
        .catch ((error) => {
          reject(error)
        })
    })
  },
  // 登出
  Logout ({ commit, state }) {
    return new Promise((resolve) => {
      logout(state.token)
      .then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('RECORD_USERINFO', {})
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
      }).catch(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('RECORD_USERINFO', {})
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
      }).finally(() => {
      })
      // commit('SET_TOKEN', '')
      // commit('SET_ROLES', [])
      // commit('RECORD_USERINFO', {})
      // Vue.ls.remove(ACCESS_TOKEN)
      // resolve()
    })
  },
  GetInfo ({commit}) {
    return new Promise ((resolve, reject) => {
      getInfo().then((res) => {
        if (res.data.roleIds) {
          commit('SET_ROLES', res.data.roleIds)
          commit('SET_BUTTONS', res.data.buttons)
          commit('SET_USERID', res.data.userId)
          commit('RECORD_USERINFO', res.data)
          commit('SET_TOKEN', Vue.ls.get(ACCESS_TOKEN))
        } else {
          reject(new Error('getInfo: roles must be a non-null array !'))
        }
        commit('SET_NAME', res.data.userName)
        commit('SET_AVATAR', res.data.avatar || `https://dummyimage.com/200x200/87add4/FFFFFF&text=${res.data.userName.substr(0,1)}`)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
   // user resetPassword
  resetPassword ({ commit, state }, userInfo) {
    const { oldPassword, newPassword } = userInfo
    return new Promise((resolve, reject) => {
      resetPassword({ oldPassword: oldPassword, newPassword: newPassword }).then(rsp => {
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}

