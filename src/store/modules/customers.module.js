import API from '../../api.js'

export default {
    namespaced: true,
    state: {
        item: {},
        list: [],
        message: null
    },
    getters: {
        item(state) {
            return state.item
        },
        list(state) {
            return state.list
        },
        message(state) {
            return state.message
        }
    },
    mutations: {
        getCustomer(state, payload) {
            return state.item = payload
        },
        getCustomers(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        }
    },
    actions: {
        index(context) {
            return new Promise ((resolve, reject) => {
                API.get(`customers/`)
                    .then(response => {
                        context.commit('getCustomers', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        show({commit}, customerId) {
            return new Promise ((resolve, reject) => {
                API.get(`customers/${customerId}`)
                    .then(response => {
                        commit('getCustomer', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`customers/`, newItem)
                    .then(response => {
                        commit('getCustomer', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, customerId, updateItem) {
            return new Promise ((resolve, reject) => {
                API.put(`customers/${customerId}`, updateItem)
                    .then(response => {
                        commit('getCustomer', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('getMessage', error.data.message)
                        reject(error)
                    })
            })
        },
        destroy({commit}, customerId) {
            return new Promise ((resolve, reject) => {
                API.delete(`customers/${customerId}`)
                    .then(response => {
                        commit('getCustomer', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}