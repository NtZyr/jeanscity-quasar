export function getCart () {
  const cart = JSON.parse(localStorage.getItem('cart'))
  if (!cart) {
    return {
      lines: [],
      customer_id: null,
      customer: {},
      shipping_id: null
    }
  }
  return cart
}
