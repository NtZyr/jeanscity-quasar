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
    getCategory (state, payload) {
      return state.item = Object.assign({}, payload)
    },
    getCategories (state, payload) {
      return state.list = Object.assign({}, payload)
    },
    getMessage (state, payload) {
      return state.message = Object.assign({}, payload)
    }
  },
  actions: {
    parents (context) {
      return new Promise((resolve, reject) => {
        API.get(`categories/parents`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            // context.commit('getCategories', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    index (context, filter) {
      return new Promise((resolve, reject) => {
        API.get(`categories/`, {
          params: filter
        })
          .then(response => {
            context.commit('getCategories', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show ({ commit }, categoryId) {
      return new Promise((resolve, reject) => {
        API.get(`categories/${categoryId}`)
          .then(response => {
            commit('getCategory', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`categories/`, newItem, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            // console.log(response)
            context.commit('getCategory', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            // commit('getMessage', error.data.message)
            reject(error)
          })
      })
    },
    update (context, category) {
      return new Promise((resolve, reject) => {
        API.put(`categories/${category.id}`, category, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getCategory', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroy (context, categoryId) {
      return new Promise((resolve, reject) => {
        API.delete(`categories/${categoryId}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getCategory', response.data.data)
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
