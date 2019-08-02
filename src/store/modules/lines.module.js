import API from '../../api'

export default {
  namespaced: true,
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {
    index (context, orderId) {
      return new Promise((resolve, reject) => {
        API.get(`orders/${orderId}/lines`, { headers: {
          'Authorization': `Bearer ${context.rootState.auth.token}`
        } })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
