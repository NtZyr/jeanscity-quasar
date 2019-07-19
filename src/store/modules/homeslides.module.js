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
        getHomeslide(state, payload) {
            return state.item = payload
        },
        getHomeslides(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        },
    },
    actions: {
        index(context) {
            return new Promise ((resolve, reject) => {
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
        show({commit}, homeSlideId) {
            return new Promise ((resolve, reject) => {
                API.get(`homeslides/${homeSlideId}`)
                    .then(response => {
                        commit('getHomeslide', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`homeslides/`, newItem)
                    .then(response => {
                        commit('getHomeslide', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, homeSlideId, updateItem) {
            return new Promise ((resolve, reject) => {
                API.put(`homeslides/${homeSlideId}`, updateItem)
                    .then(response => {
                        commit('getHomeslide', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, homeSlideId) {
            return new Promise ((resolve, reject) => {
                API.delete(`homeslides/${homeSlideId}`)
                    .then(response => {
                        commit('getHomeslide', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    }
}