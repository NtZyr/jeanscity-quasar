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
        getMail(state, payload) {
            return state.item = payload
        },
        getMails(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        },
    },
    actions: {
        index(context) {
            return new Promise ((resolve, reject) => {
                API.get(`mails/`)
                    .then(response => {
                        context.commit('getMails', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        show({commit}, mailId) {
            return new Promise ((resolve, reject) => {
                API.get(`mails/${mailId}`)
                    .then(response => {
                        commit('getMail', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`mails/`, newItem)
                    .then(response => {
                        commit('getMail', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, mailId, updateItem) {
            return new Promise ((resolve, reject) => {
                API.put(`mails/${mailId}`, updateItem)
                    .then(response => {
                        commit('getMail', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, mailId) {
            return new Promise ((resolve, reject) => {
                API.delete(`mails/${mailId}`)
                    .then(response => {
                        commit('getMail', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    }
}