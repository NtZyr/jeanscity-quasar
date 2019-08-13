export default {
  namespaced: true,
  state: {
    filter: {},
    attrs: []
  },
  getters: {
    filter (state) {
      return state.filter
    },
    attrs (state) {
      return state.attrs
    }
  },
  mutations: {
    SET_ATTRS (state, payload) {
      state.attrs = Object.assign({}, payload)
    },
    SET_FILTER (state, payload) {
      state.filter = Object.assign({}, payload)
    },
    SET_CATEGORIES (state, payload) {
      state.filter = Object.assign({}, state.filter, { categories: payload })
    },
    SET_ATTRIBUTES (state, payload) {
      state.filter = Object.assign({}, state.filter, { [Object.keys(payload)[0]]: Object.values(payload)[0] })
    },
    SET_PRICE (state, payload) {
      state.filter = Object.assign({}, state.filter, { price: [payload.min, payload.max] })
    },
    SET_SALE (state, payload) {
      state.filter = Object.assign({}, state.filter, { sale: payload })
    },
    SET_PAGE (state, payload) {
      state.filter = Object.assign({}, state.filter, { page: payload })
    }
  },
  actions: {
    attrs ({ commit, dispatch }, attrs) {
      commit('SET_ATTRS', attrs)
    },
    filterFromQuery ({ commit, dispatch }, filter) {
      commit('SET_FILTER', filter)
      dispatch('filterQuery')
    },
    filterQuery ({ state }) {
      let filter = Object.assign({}, state.filter)
      delete filter.categories
      this.$router.push({ query: filter })
    },
    categories ({ commit, dispatch }, categories) {
      commit('SET_CATEGORIES', categories)
      dispatch('filterQuery')
    },
    attributes ({ commit, dispatch }, attributes) {
      commit('SET_ATTRIBUTES', attributes)
      dispatch('filterQuery')
    },
    price ({ commit, dispatch }, price) {
      commit('SET_PRICE', price)
      dispatch('filterQuery')
    },
    sale ({ commit, dispatch }, sale) {
      commit('SET_SALE', sale)
      dispatch('filterQuery')
    },
    page ({ commit, dispatch }, page) {
      commit('SET_PAGE', page)
      dispatch('filterQuery')
    }
  }
}
