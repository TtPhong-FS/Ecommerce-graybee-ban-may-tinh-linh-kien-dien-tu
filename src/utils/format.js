import dayjs from 'dayjs'

export const formattedPrice = (price) => {
  return new Intl.NumberFormat('vi', {
    currency: 'VND',
    style: 'currency'
  }).format(price)
}

export const formattedDateTime = (date) => dayjs(date).format('MMMM DD, HH:mm')
