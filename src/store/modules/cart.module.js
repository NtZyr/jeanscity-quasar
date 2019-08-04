export default {
  namespaced: true,
  state: {
    card: {
      shippingId: null,
      customerId: null,
      customer: [],
      lines: []
    }
  },
  getters: {
    cart (state) {
      return state.cart
    },
    lines (state) {
      return state.cart.lines
    },
    customer (state) {
      return state.cart.customer
    }
  },
  mutations: {
    addItem (state, { newItem }) {
      if (state.cart.lines.find(item => item.variantId === newItem.variantId)) {
        //?
      } else {
        return state.cart.lines.push(newItem)
      }
    },
    removeItem (state, { variantId }) {
      state.cart.lines = state.cart.lines.filter(el =>
        el.variantId !== variantId
      )
    },
    updateLocal (state) {
      localStorage.setItem('cart', state.cart)
    },
    addCustomer (state, payload) {
      state.cart.customer.push(payload)
    },
    addShipping (state, payload) {
      state.cart.shippingId = payload
    }
  },
  actions: {
    addItem (context, newItem) {
      context.commit('addItem', { newItem })
      context.dispatch('updateLocal')
    },
    removeItem (context, id) {
      context.commit('removeItem', { variantId: id })
      context.dispatch('updateLocal')
    },
    addCustomer (context, customer) {
      context.commit('addCustomer', customer)
      context.dispatch('updateLocal')
    },
    addShipping (context, shippingId) {
      context.commit('addCustomer', shippingId)
      context.dispatch('updateLocal')
    }
  }
}
