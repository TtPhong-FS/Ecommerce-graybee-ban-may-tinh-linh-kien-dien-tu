import { CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons'

export const orderStatus = {
  PENDING: 'Chờ xác nhận',
  COMPLETED: 'Hoàn thành'
}

export const paymentStatus = {
  PENDING: 'Chưa thanh toán',
  COMPLETED: 'Đã thanh toán'
}

export const iconMap = {
  PENDING: <ClockCircleOutlined />,
  COMPLETED: <CheckCircleOutlined style={{ color: 'green' }} />
}

export const colorMap = {
  PENDING: 'warning',
  COMPLETED: 'success'
}
