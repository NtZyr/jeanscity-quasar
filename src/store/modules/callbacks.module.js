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
        getCallback(state, payload) {
            return state.item = payload
        },
        getCallbacks(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        }
    },
    actions: {
        index(context) {
            return new Promise ((resolve, reject) => {
                API.get(`callbacks/`)
                    .then(response => {
                        context.commit('getCallbacks', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`callbacks/`, newItem)
                    .then(response => {
                        commit('getCallback', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        show({commit}, callbackId) {
            return new Promise ((resolve, reject) => {
                API.get(`callbacks/${callbackId}`)
                    .then(response => {
                        commit('getCallback', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, callbackId, updateItem) {
            return new Promise ((resolve, reject) => {
                API.put(`callbacks/${callbackId}`, updateItem)
                    .then(response => {
                        commit('getCallback', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, callbackId) {
            return new Promise ((resolve, reject) => {
                API.delete(`callbacks/${callbackId}`)
                    .then(response => {
                        commit('getCallback', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}