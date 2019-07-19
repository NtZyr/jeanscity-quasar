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
        getValue(state, payload) {
            return state.item = payload
        },
        getValues(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        }
    },
    actions: {
        index(context, attributeId) {
            return new Promise ((resolve, reject) => {
                API.get(`attributes/${attributeId}/values/`)
                    .then(response => {
                        context.commit('getValues', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        show({commit}, attributeId, valueId) {
            return new Promise ((resolve, reject) => {
                API.get(`attributes/${attributeId}/values/${valueId}`)
                    .then(response => {
                        commit('getValue', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, attributeId, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`attribute/${attributeId}/values/`, newItem)
                    .then(response => {
                        commit('getValue', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, attributeId, valueId, updateItem) {
            return new Promise ((resolve, reject) => {
                API.put(`attribute/${attributeId}/values/${valueId}`, updateItem)
                    .then(response => {
                        commit('getValue', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, attributeId, valueId) {
            return new Promise ((resolve, reject) => {
                API.delete(`attribute/${attributeId}/values/${valueId}`)
                    .then(response => {
                        commit('getValue', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}