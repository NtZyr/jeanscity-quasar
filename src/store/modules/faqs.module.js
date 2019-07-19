import API from '../../api.js'

export default {
    namespace: true,
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
        getFaqs(state, payload) {
            return state.list = payload
        },
        getFaq(state, payload) {
            return state.item = payload
        },
        getMessage(state, payload) {
            return state.message = payload
        }
    },
    actions: {
        index(context) {
            return new Promise((resolve, reject) => {
                API.get(`faqs/`)
                    .then(response => {
                        context.commit('getFaqs', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        show({commit}, faqId) {
            return new Promise((resolve, reject) => {
                API.get(`faqs/${faqId}`)
                    .then(response => {
                        commit('getFaq', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        store({commit}, newItem) {
            return new Promise((resolve, reject) => {
                API.post(`faqs/`, newItem)
                    .then(response => {
                        commit('getFaq', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        update({commit}, faqId, updateItem) {
            return new Promise((resolve, reject) => {
                API.put(`faqs/${faqId}`, updateItem)
                    .then(response => {
                        // console.log(response)
                        commit('getFaq', response.data.data)
                        commit('getMessage', response.data.message)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroy({commit}, faqId) {
            return new Promise((resolve, reject) => {
                API.delete(`faqs/${faqId}`)
                    .then(response => {
                        commit('getFaq', response.data.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}