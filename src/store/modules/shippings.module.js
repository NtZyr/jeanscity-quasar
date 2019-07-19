import API from '../../api.js'

export default {
    namespaced: true,
    state: {
        list: [],
        item: {},
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
        getShipping(state, payload) {
            return state.item = payload
        },
        getShippings(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        },
    },
    actions: {
        index(context) {
            return new Promise ((resolve, reject) => {
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
        show({commit}, shippingId) {
            return new Promise ((resolve, reject) => {
                API.get(`shippings/${shippingId}`)
                    .then(response => {
                        commit('getShipping', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`shippings/`, newItem)
                    .then(response => {
                        commit('getShipping', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, shippingId, updateItem) {
            return new Promise ((resolve, reject) => {
                API.put(`shippings/${shippingId}`, updateItem)
                    .then(response => {
                        commit('getShipping', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, shippingId) {
            return new Promise ((resolve, reject) => {
                API.delete(`shippings/${shippingId}`)
                    .then(response => {
                        commit('getShipping', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    }
}