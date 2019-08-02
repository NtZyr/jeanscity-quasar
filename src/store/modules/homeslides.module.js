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
    getHomeslide (state, payload) {
      return state.item = Object.assign({}, payload)
    },
    getHomeslides (state, payload) {
      return state.list = payload
    },
    getMessage (state, payload) {
      return state.message = Object.assign({}, payload)
    }
  },
  actions: {
    index (context) {
      return new Promise((resolve, reject) => {
        API.get(`homeslides/`)
          .then(response => {
            context.commit('getHomeslides', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, homeSlideId) {
      return new Promise((resolve, reject) => {
        API.get(`homeslides/${homeSlideId}`)
          .then(response => {
            context.commit('getHomeslide', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`homeslides/`, newItem, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getHomeslide', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, slide) {
      return new Promise((resolve, reject) => {
        API.put(`homeslides/${slide.id}`, slide, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getHomeslide', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroy (context, homeSlideId) {
      return new Promise((resolve, reject) => {
        API.delete(`homeslides/${homeSlideId}`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            context.commit('getHomeslide', response.data.data)
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
