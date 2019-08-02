import API from '../../api.js'

export default {
  namespaced: true,
  state: {
    statuses: [],
    list: [],
    item: {},
    message: null,
    errors: {},
    onhold: null
  },
  getters: {
    item (state) {
      return state.item
    },
    list (state) {
      return state.list
    },
    statuses (state) {
      return state.roles
    },
    onhold (state) {
      return state.onhold
    }
  },
  mutations: {
    getOrder (state, payload) {
      return state.item = Object.assign({}, payload)
    },
    getOrders (state, payload) {
      return state.list = Object.assign({}, payload)
    },
    getStatuses (state, payload) {
      return state.statuses = Object.assign({}, payload)
    },
    getOnHold (state, payload) {
      return state.onhold = payload
    }
  },
  actions: {
    onhold (context) {
      return new Promise((resolve, reject) => {
        API.get(`orders/onhold`, {
          headers: {
            'Authorization': `Bearer ${context.rootState.auth.token}`
          }
        })
          .then(response => {
            context.commit('getOnHold', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    index (context, filter) {
      return new Promise((resolve, reject) => {
        API.get(`orders/`, {
          headers: {
            'Authorization': `Bearer ${context.rootState.auth.token}`
          },
          params: filter
        })
          .then(response => {
            context.commit('getOrders', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    statuses (context) {
      return new Promise((resolve, reject) => {
        API.get(`orders/statuses/`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getStatuses', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, orderId) {
      return new Promise((resolve, reject) => {
        API.get(`orders/${orderId}`, { headers: {
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
        API.post(`orders/`, newItem)
          .then(response => {
            context.commit('getOrder', response.data.data)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, data) {
      return new Promise((resolve, reject) => {
        API.put(`orders/${data.id}`, data, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getOrder', response.data.data)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroy (context, userId) {
      return new Promise((resolve, reject) => {
        API.delete(`orders/${userId}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getOrder', response.data.data)
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
