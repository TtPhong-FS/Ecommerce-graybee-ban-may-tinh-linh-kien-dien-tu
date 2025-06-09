import { CircleCheck, Clock } from 'lucide-react'

export const orderStatus = {
  PENDING: 'Chờ xác nhận',
  COMPLETED: 'Hoàn thành'
}

export const paymentStatus = {
  PENDING: 'Chưa thanh toán',
  COMPLETED: 'Đã thanh toán'
}

export const iconMap = {
  PENDING: <Clock size={16} color="#dabc2b" />,
  COMPLETED: <CircleCheck size={16} color="#14ad1f" />
}

export const colorMap = {
  PENDING: 'warning',
  COMPLETED: 'success'
}

export const deliveryType = {
  HOME_DELIVERY: 'Giao hàng tận nhà',
  STORE_PICKUP: 'Nhận tại cửa hàng'
}

export const paymentMethod = [
  {
    value: 'COD',
    label: 'Thanh toán khi nhận hàng'
  }
]
