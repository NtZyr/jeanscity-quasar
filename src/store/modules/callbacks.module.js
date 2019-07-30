import API from '../../api.js'

export default {
  namespaced: true,
  state: {
    item: {},
    list: [],
    message: null,
    unanswered: null
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
    },
    unanswered (state) {
      return state.unanswered
    }
  },
  mutations: {
    getCallback (state, payload) {
      return state.item = payload
    },
    getUnansweredCallbacks (state, payload) {
      return state.unanswered = payload
    },
    getCallbacks (state, payload) {
      return state.list = payload
    },
    getMessage (state, payload) {
      return state.message = payload
    }
  },
  actions: {
    unanswered (context) {
      return new Promise((resolve, reject) => {
        API.get(`callbacks/unanswered`, {
          headers: {
            'Authorization': `Bearer ${context.rootState.auth.token}`
          }
        })
          .then(response => {
            context.commit('getUnansweredCallbacks', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    index (context, filter) {
      return new Promise((resolve, reject) => {
        API.get(`callbacks/`, {
          headers: {
            'Authorization': `Bearer ${context.rootState.auth.token}`
          },
          params: filter
        })
          .then(response => {
            context.commit('getCallbacks', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`callbacks/`, newItem)
          .then(response => {
            context.commit('getCallback', response.data.data)
            context.commit('getMessage', response.data.message)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, callbackId) {
      return new Promise((resolve, reject) => {
        API.get(`callbacks/${callbackId}`, {
          headers: {
            'Authorization': `Bearer ${context.rootState.auth.token}`
          }
        })
          .then(response => {
            context.commit('getCallback', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, callback) {
      return new Promise((resolve, reject) => {
        API.put(`callbacks/${callback.id}`, callback, {
          headers: {
            'Authorization': `Bearer ${context.rootState.auth.token}`
          }
        })
          .then(response => {
            context.commit('getCallback', response.data.data)
            context.commit('getMessage', response.data.message)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroy (context, callbackId) {
      return new Promise((resolve, reject) => {
        API.delete(`callbacks/${callbackId}`)
          .then(response => {
            context.commit('getCallback', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
