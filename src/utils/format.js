export const formattedPrice = (price) => {
  return new Intl.NumberFormat('vi', {
    currency: 'VND',
    style: 'currency'
  }).format(price)
}
