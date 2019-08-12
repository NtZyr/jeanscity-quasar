export default {
  namespaced: true,
  state: {
    filter: {}
  },
  getters: {
    filter (state) {
      return state.filter
    }
  },
  mutations: {
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
    }
  },
  actions: {
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
    }
  }
}
