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
        getAnswer(state, payload) {
            return state.item = payload
        },
        getAnswers(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        }
    },
    actions: {
        index(context, callbackId) {
            return new Promise ((resolve, reject) => {
                API.get(`callbacks/${callbackId}/answers/`)
                    .then(response => {
                        context.commit('getAnswers', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, callbackId, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`callbacks/${callbackId}/answers/`, newItem)
                    .then(response => {
                        commit('getAnswer', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        show({commit}, callbackId, callbackAnswerId) {
            return new Promise ((resolve, reject) => {
                API.get(`callbacks/${callbackId}/answers/${callbackAnswerId}`)
                    .then(response => {
                        commit('getAnswer', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, callbackId, callbackAnswerId) {
            return new Promise ((resolve, reject) => {
                API.delete(`callbacks/${callbackId}/answers/${callbackAnswerId}`)
                    .then(response => {
                        commit('getAnswer', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}

