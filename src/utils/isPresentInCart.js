export const isPresentInCart = (cartItems, productId) => {
  for (let item of cartItems) {
    if (productId === item?.product?.id) {
      return true
    }
  }
  return false
}
