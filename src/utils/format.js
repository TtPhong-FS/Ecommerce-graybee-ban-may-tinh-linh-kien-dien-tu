import dayjs from 'dayjs'

export const formattedPrice = (price) => {
  return new Intl.NumberFormat('vi', {
    currency: 'VND',
    style: 'currency'
  }).format(price)
}

export const formattedDateTime = (date) => dayjs(date).format('MMMM DD, HH:mm')

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD') // tách ký tự có dấu thành ký tự thường + dấu
    .replace(/[\u0300-\u036f]/g, '') // loại bỏ dấu
    .trim() // xóa khoảng trắng đầu/cuối
    .replace(/\s+/g, '_') // thay khoảng trắng bằng gạch dưới
}
