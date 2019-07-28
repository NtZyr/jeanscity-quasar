import API from '../../api.js'

export default {
  namespaced: true,
  state: {
    roles: [],
    list: [],
    item: {},
    message: null,
    errors: {}
  },
  getters: {
    item (state) {
      return state.item
    },
    list (state) {
      return state.list
    },
    roles (state) {
      return state.roles
    },
    message (state) {
      return state.message
    },
    errors (state) {
      return state.errors
    }
  },
  mutations: {
    getUser (state, payload) {
      // return state.item = payload.slice()
      return state.item = Object.assign({}, payload)
    },
    getErrors (state, payload) {
      // return state.errors = payload.slice()
      return state.errors = Object.assign({}, payload)
    },
    getUsers (state, payload) {
      // return state.list = payload.slice()
      return state.list = Object.assign({}, payload)
    },
    getMessage (state, payload) {
      // return state.message = payload.slice()
      return state.message = Object.assign({}, payload)
    },
    getRoles (state, payload) {
      // return state.roles = payload.slice()
      return state.roles = Object.assign({}, payload)
    }
  },
  actions: {
    index (context, filter) {
      return new Promise((resolve, reject) => {
        API.get(`users/`, {
          headers: {
            'Authorization': `Bearer ${context.rootState.auth.token}`
          },
          params: filter
        })
          .then(response => {
            context.commit('getUsers', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    roles (context) {
      return new Promise((resolve, reject) => {
        API.get(`users/roles/`)
          .then(response => {
            context.commit('getRoles', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, userId) {
      return new Promise((resolve, reject) => {
        API.get(`users/${userId}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`users/`, newItem, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getUser', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            context.commit('getErrors', error.response.data.errors)
            reject(error)
          })
      })
    },
    update (context, data) {
      return new Promise((resolve, reject) => {
        API.put(`users/${data.id}`, data, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getUser', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            context.commit('getErrors', error.response.data.errors)
            reject(error)
          })
      })
    },
    destroy (context, userId) {
      return new Promise((resolve, reject) => {
        API.delete(`users/${userId}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getUser', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
