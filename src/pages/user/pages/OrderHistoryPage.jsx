import { Input, Tabs } from 'antd'
import { OrderCard } from '../components/OrderCard'

const statusNavigation = [
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

export const OrderHistoryPage = () => {
  const handleFindOrderByStatus = (key) => {
    if (key === 'all') {
      console.log('Find All order')
    } else {
      console.log('Find order by status: ', key)
    }
  }

  return (
    <div>
      <header className="grid grid-cols-2 py-3 pb-6">
        <h2 className="title">Lịch sử mua hàng</h2>
        <Input.Search placeholder="Nhập mã đơn hàng hoặc tên sản phẩm để tìm kiếm..." />
      </header>
      <Tabs
        tabBarStyle={{ backgroundColor: 'white', borderRadius: '10x 10px 0 0' }}
        centered
        size="middle"
        defaultActiveKey="all"
        items={statusNavigation}
        onChange={handleFindOrderByStatus}
      />
    </div>
  )
}
