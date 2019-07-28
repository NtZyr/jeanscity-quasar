import API from '../../api.js'

import { getLocalToken } from '../../helpers/auth'

const token = getLocalToken()

export default {
  namespaced: true,
  state: {
    authUser: {},
    token: token,
    isAuth: !!token,
    message: null
  },
  getters: {
    authUser (state) {
      return state.authUser
    },
    token (state) {
      return state.token
    },
    isAuth (state) {
      return state.isAuth
    },
    message (state) {
      return state.message
    }
  },
  mutations: {
    loginSuccess (state, payload) {
      state.message = payload.message
      state.authUser = payload.data.user
      state.isAuth = true
      state.token = payload.data.token
      localStorage.setItem('token', payload.data.token)
    },
    getMessage (state, payload) {
      state.message = payload
    },
    logout (state) {
      state.authUser = null
      state.token = null
      state.isAuth = false
      localStorage.removeItem('token')
    }
  },
  actions: {
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        API.post(`auth/login/`, data)
          .then(response => {
            commit('loginSuccess', response.data)
            resolve(response)
          })
          .catch(error => {
            commit('getMessage', error.data.message)
            reject(error)
          })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        API.get(`auth/logout/`, { headers: {
          'Authorization': `Bearer ${context.getters.token}`
        } })
          .then(response => {
            context.commit('logout')
            context.commit('getMessage', response.data.message)
            resolve(response)
          })
          .catch(error => {
            commit('getMessage', error.data.message)
            reject(error)
          })
      })
    }
  }
}
