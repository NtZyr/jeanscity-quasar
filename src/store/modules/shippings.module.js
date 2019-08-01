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
    getShipping (state, payload) {
      return state.item = Object.assign({}, payload)
    },
    getShippings (state, payload) {
      return state.list = Object.assign({}, payload)
    },
    getMessage (state, payload) {
      return state.message = Object.assign({}, payload)
    }
  },
  actions: {
    index (context) {
      return new Promise((resolve, reject) => {
        API.get(`shippings/`)
          .then(response => {
            context.commit('getShippings', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, shippingId) {
      return new Promise((resolve, reject) => {
        API.get(`shippings/${shippingId}`)
          .then(response => {
            context.commit('getShipping', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`shippings/`, newItem, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getShipping', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, shipping) {
      return new Promise((resolve, reject) => {
        API.put(`shippings/${shipping.id}`, shipping, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getShipping', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroy (context, shippingId) {
      return new Promise((resolve, reject) => {
        API.delete(`shippings/${shippingId}`, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getShipping', response.data.data)
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
