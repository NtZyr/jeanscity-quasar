import API from '../../api.js'

export default {
  namespaced: true,
  state: {
    item: {},
    list: [],
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
    getCustomer (state, payload) {
      state.item = Object.assign({}, payload)
    },
    getCustomers (state, payload) {
      state.list = Object.assign({}, payload)
    },
    getMessage (state, payload) {
      state.message = Object.assign({}, payload)
    }
  },
  actions: {
    localCustomer (context) {
      localStorage.setItem('customer_id', context.state.item.id)
    },
    index (context, filter) {
      return new Promise((resolve, reject) => {
        API.get(`customers/`, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` },
          params: filter
        })
          .then(response => {
            context.commit('getCustomers', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    show (context, customerId) {
      return new Promise((resolve, reject) => {
        API.get(`customers/${customerId}`, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getCustomer', response.data.data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    store (context, newItem) {
      return new Promise((resolve, reject) => {
        API.post(`customers/`, newItem)
          .then(response => {
            context.commit('getCustomer', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            context.dispatch('localCustomer')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    update (context, customer) {
      return new Promise((resolve, reject) => {
        API.put(`customers/${customer.id}`, customer, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getCustomer', response.data.data)
            context.commit('getMessage', response.data.message)
            context.dispatch('index')
            resolve(response)
          })
          .catch(error => {
            context.commit('getMessage', error.data.message)
            reject(error)
          })
      })
    },
    destroy (context, customerId) {
      return new Promise((resolve, reject) => {
        API.delete(`customers/${customerId}`, {
          headers: { 'Authorization': `Bearer ${context.rootState.auth.token}` }
        })
          .then(response => {
            context.commit('getCustomer', response.data.data)
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
