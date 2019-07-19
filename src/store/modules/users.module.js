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
        roles(state) {
            return state.list
        },
        message(state) {
            return state.message
        }
    },
    mutations: {
        getUser(state, payload) {
            return state.item = payload
        },
        getUsers(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        },
        getRoles(state, payload) {
            return state.roles = payload
        }
    },
    actions: {
        index(context) {
            return new Promise ((resolve, reject) => {
                API.get(`users/`)
                    .then(response => {
                        context.commit('getUsers', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        roles({commit}, userId) {
            return new Promise ((resolve,reject) => {
                API.get(`users/${userId}/roles/`)
                    .then(response => {
                        commit('getRoles', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        show({commit}, userId) {
            return new Promise ((resolve, reject) => {
                API.get(`users/${userId}`)
                    .then(response => {
                        commit('getUser', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise ((resolve, reject) => {
                API.post(`users/`, newItem)
                    .then(response => {
                        commit('getUser', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, userId, updateItem) {
            return new Promise ((resolve, reject) => {
                API.put(`users/${userId}`, updateItem)
                    .then(response => {
                        commit('getUser', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, userId) {
            return new Promise ((resolve, reject) => {
                API.delete(`user/${userId}`)
                    .then(response => {
                        commit('getUser', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}