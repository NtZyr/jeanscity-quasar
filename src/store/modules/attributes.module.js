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
        item(state) {
            return state.item
        },
        list(state) {
            return state.list
        },
        message(state) {
            return state.message
        },
        types(state) {
            return state.types
        }
    },
    mutations: {
        getAttribute(state, payload) {
            return state.item = payload
        },
        getAttributes(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        },
        getTypes(state, payload) {
            return state.types = payload
        }
    },
    actions: {
        index(context) {
            return new Promise ((resolve, reject) => {
                API.get(`attributes/`)
                    .then(response => {
                        context.commit('getAttributes', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        show({commit}, attributeId) {
            return new Promise ((resolve, reject) => {
                API.get(`attributes/${attributeId}`)
                    .then(response => {
                        commit('getAttribute', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`attributes/`, newItem)
                    .then(response => {
                        commit('getAttribute', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, attributeId, updateItem) {
            return new Promise ((resolve, reject) => {
                API.put(`attributes/${attributeId}`, updateItem)
                    .then(response => {
                        commit('getAttribute', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('getMessage', error.data.message)
                        reject(error)
                    })
            })
        },
        destroy({commit}, attributeId) {
            return new Promise ((resolve, reject) => {
                API.delete(`attribute/${attributeId}`)
                    .then(response => {
                        commit('getAttribute', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        types({commit}) {
            return new Promise ((resolve, reject) => {
                API.get('/attributes/types')
                    .then(response => {
                        commit('getTypes', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}