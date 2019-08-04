export default {
  namespaced: true,
  state: {
    cart: {
      shipping_id: null,
      customer_id: null,
      customer: {},
      lines: []
    },
    message: null
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
      state.cart.lines.push(newItem)
    },
    countPlus (state, { newItem }) {
      state.cart.lines.variant.qty += newItem.qty
    },
    removeItem (state, { variantId }) {
      state.cart.lines = state.cart.lines.filter(el =>
        el.variant_id !== variantId
      )
    },
    getMessage (state, payload) {
      state.message = payload
    },
    updateLocal (state) {
      localStorage.setItem('cart', state.cart)
    },
    addCustomer (state, payload) {
      state.cart.customer = payload
    },
    addShipping (state, payload) {
      state.cart.shippingId = payload
    }
  },
  actions: {
    addItem (context, newItem) {
      let item = context.state.cart.lines.find(item => item.variant_id === newItem.variant.id)
      if (item) {
        if (item.qty + newItem.qty < newItem.variant.in_stock && item.qty + newItem.qty > 0) {
          context.commit('countPlus', { newItem })
          context.commit('getMessage', 'Товар успешно добавлен')
        } else {
          // context.state.message = 'Не удалось добавить товар в корзину'
        }
      } else if (newItem.qty < newItem.variant.in_stock) {
        context.commit('addItem', { newItem })
        context.commit('getMessage', 'Товар успешно добавлен')
      } else {
        context.commit('getMessage', 'Недостаточно товара')
      }
      context.dispatch('updateLocal')
    },
    removeItem (context, id) {
      context.commit('removeItem', { variant_id: id })
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
