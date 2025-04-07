export const isPresentInFavorites = (favorites, productId) => {
  for (let item of favorites) {
    if (productId === item?.id) {
      return true
    }
  }
  return false
}
