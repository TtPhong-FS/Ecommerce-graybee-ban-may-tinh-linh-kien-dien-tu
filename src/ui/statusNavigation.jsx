import { OrderCard } from '../pages/user/components/orders/OrderCard'

export const statusNavigation = [
  {
    key: 'all',
    label: 'Tất cả',
    children: <OrderCard />
  },
  {
    key: 'processing',
    label: 'Đang xử lý',
    children: <OrderCard />
  },
  {
    key: 'delivered',
    label: 'Đang giao',
    children: <OrderCard />
  },
  {
    key: 'completed',
    label: 'Hoàn tất',
    children: <OrderCard />
  },
  {
    key: 'cancelled',
    label: 'Đã huỷ',
    children: <OrderCard />
  },
  {
    key: 'refuned',
    label: 'Trả hàng',
    children: <OrderCard />
  }
]
