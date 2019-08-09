import API from '../../api.js'

export default {
  namespaced: true,
  state: {
    list: [],
    item: {},
    message: null,
    types: {}
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
    types (state) {
      return state.types
    }
  },
  mutations: {
    getAttribute (state, payload) {
      state.item = Object.assign({}, payload)
    },
    getAttributes (state, payload) {
      state.list = Object.values(payload)
    },
    getMessage (state, payload) {
      state.message = Object.assign({}, payload)
    },
    getTypes (state, payload) {
      state.types = Object.values(payload)
    }
  },
  actions: {
    index (context, filter) {
      return new Promise((resolve, reject) => {
        API.get(`attributes/`, {
          params: filter
        })
          .then(response => {
            context.commit('getAttributes', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, attributeId) {
      return new Promise((resolve, reject) => {
        API.get(`attributes/${attributeId}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getAttribute', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`attributes/`, newItem, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getAttribute', response.data.data)
            context.commit('getMessage', response.data.message)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, attribute) {
      return new Promise((resolve, reject) => {
        API.put(`attributes/${attribute.id}`, attribute, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getAttribute', response.data.data)
            context.commit('getMessage', response.data.message)
            resolve(response)
          })
          .catch(error => {
            context.commit('getMessage', error.data.message)
            reject(error)
          })
      })
    },
    destroy (context, attributeId) {
      return new Promise((resolve, reject) => {
        API.delete(`attributes/${attributeId}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getAttribute', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    types (context) {
      return new Promise((resolve, reject) => {
        API.get('/attributes/types', { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getTypes', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
