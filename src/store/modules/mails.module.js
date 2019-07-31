import API from '../../api.js'

export default {
  namespaced: true,
  state: {
    list: [],
    item: {},
    message: null
  },
  getters: {
    item (state) {
      return state.item
    },
    list (state) {
      return state.list
    },
    message (state) {
      return state.message
    }
  },
  mutations: {
    getMail (state, payload) {
      return state.item = Object.assign({}, payload)
    },
    getMails (state, payload) {
      return state.list = Object.assign({}, payload)
    },
    getMessage (state, payload) {
      return state.message = Object.assign({}, payload)
    }
  },
  actions: {
    index (context, filter) {
      return new Promise((resolve, reject) => {
        API.get(`mails/`, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` },
          params: filter
        })
          .then(response => {
            context.commit('getMails', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, mailId) {
      return new Promise((resolve, reject) => {
        API.get(`mails/${mailId}`, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getMail', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`mails/`, newItem, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getMail', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, mail) {
      return new Promise((resolve, reject) => {
        API.put(`mails/${mail.id}`, mail, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getMail', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroy (context, mailId) {
      return new Promise((resolve, reject) => {
        API.delete(`mails/${mailId}`, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getMail', response.data.data)
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
