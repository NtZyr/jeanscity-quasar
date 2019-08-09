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
    getProduct (state, payload) {
      state.item = Object.assign({}, payload)
    },
    getProducts (state, payload) {
      state.list = Object.values(payload)
    },
    getMessage (state, payload) {
      state.message = Object.assign({}, payload)
    }
  },
  actions: {
    index (context, filter) {
      return new Promise((resolve, reject) => {
        API.get(`products/`, {
          params: filter
        })
          .then(response => {
            context.commit('getProducts', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show ({ commit }, id) {
      return new Promise((resolve, reject) => {
        API.get(`products/${id}`)
          .then(response => {
            commit('getProduct', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`products/`, newItem, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getProduct', response.data.data)
            context.commit('getMessage', response.data.message)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, product) {
      return new Promise((resolve, reject) => {
        API.put(`products/${product.id}`, product, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getProduct', response.data.data)
            context.commit('getMessage', response.data.message)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroy (context, id) {
      return new Promise((resolve, reject) => {
        API.delete(`products/${id}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getProduct', response.data.data)
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
