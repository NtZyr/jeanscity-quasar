import { Notify } from 'quasar'
import { getCart } from '../../helpers/cart'

export default {
  namespaced: true,
  state: {
    cart: getCart(),
    message: null
  },
  getters: {
    cart (state) {
      return state.cart
    },
    lines (state) {
      return state.cart.lines
    },
    count (state) {
      let count = 0
      state.cart.lines.find(line => {
        count += line.qty
        return count
      })

      return count
    },
    customer (state) {
      return state.cart.customer
    }
  },
  mutations: {
    ADD_TO_CART (state, newItem) {
      state.cart.lines.push(newItem)
    },
    CLEAR_CART (state) {
      state.cart.lines = []
    },
    CHANGE_ITEM (state, data) {
      state.cart.lines.find(line => {
        if (line.variant.id === data.id) {
          line.qty += data.qty
        }
      })
    },
    REMOVE_ITEM (state, variantId) {
      state.cart.lines = state.cart.lines.filter((element, index) => {
        if (element.variant_id === variantId) {
          delete state.cart.lines[index]
        }
      })
    },
    ADD_CUSTOMER_ID (state, payload) {
      state.cart.customer_id = payload
    },
    ADD_CUSTOMER (state, payload) {
      state.cart.customer = Object.assign({}, payload)
    },
    ADD_SHIPPING (state, payload) {
      state.cart.shipping_id = payload
    }
  },
  actions: {
    reduce (context, id) {
      context.commit('CHANGE_ITEM', {
        id: id,
        qty: -1
      })
      context.dispatch('updateLocal')
    },
    increase (context, id) {
      context.commit('CHANGE_ITEM', {
        id: id,
        qty: 1
      })
      context.dispatch('updateLocal')
    },
    updateLocal ({ state }) {
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clear (context) {
      context.commit('CLEAR_CART')
      context.dispatch('updateLocal')
    },
    addToCart (context, variant) {
      let line = null
      line = context.state.cart.lines.filter(element => element.variant.id === variant.id)

      if (line.length === 0) {
        Notify.create({
          message: `Товар '${variant.product.name}' добавлен в корзину`,
          position: 'top',
          color: 'positive'
        })
        context.commit('ADD_TO_CART', {
          variant_id: variant.id,
          variant: variant,
          qty: 1
        })
      } else {
        if (line[0].qty < variant.in_stock) {
          Notify.create({
            message: `Количество товара в корзине увеличилось`,
            position: 'top',
            color: 'positive'
          })
          context.commit('CHANGE_ITEM', variant.id)
        } else if (line.qty === variant.in_stock) {
          Notify.create({
            message: `Товара больше нет в наличии`,
            position: 'top',
            color: 'negative'
          })
        }
      }

      context.dispatch('updateLocal')
    },
    remove (context, id) {
      context.commit('REMOVE_ITEM', id)
      context.dispatch('updateLocal')
      Notify.create({
        message: `Товара удален из корзины`,
        position: 'top',
        color: 'negative'
      })
    },
    setCustomerId (context, id) {
      context.commit('ADD_CUSTOMER_ID', id)
      context.dispatch('updateLocal')
    },
    addCustomer (context, customer) {
      context.commit('ADD_CUSTOMER', customer)
      context.dispatch('updateLocal')
    },
    addShipping (context, shippingId) {
      context.commit('ADD_SHIPPING', shippingId)
      context.dispatch('updateLocal')
    }
  }
}
