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
        getCategory(state, payload) {
            return state.item = payload
        },
        getCategories(state, payload) {
            return state.list = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        }
    },
    actions: {
        index(context) {
            return new Promise((resolve, reject) => {
                API.get(`categories/`)
                    .then(response => {
                        context.commit('getCategories', response.data.data)
                        resolve(response)
                    })
                    .catch(error=>{
                        reject(error)
                    })
            })
        },
        show({commit}, categoryId) {
            return new Promise((resolve, reject) => {
                API.get(`categories/${categoryId}`)
                    .then(response => {
                        commit('getCategory', response.data.data)
                        resolve(response)
                    })
                    .catch(error=>{
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise((resolve, reject) => {
                API.post(`categories/`, newItem)
                    .then(response => {
                        // console.log(response)
                        commit('getCategory', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        // commit('getMessage', error.data.message)
                        reject(error)
                    })
            })
        },
        update({commit}, categoryId, updateItem) {
            return new Promise((resolve, reject) => {
                API.put(`categories/${categoryId}`, updateItem)
                    .then(response => {
                        // console.log(response)
                        commit('getCategory', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, categoryId) {
            return new Promise((resolve, reject) => {
                API.delete(`categories/${categoryId}`)
                    .then(response => {
                        commit('getCategory', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}