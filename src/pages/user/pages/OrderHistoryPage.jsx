import { Input, Tabs } from 'antd'

import { statusNavigation } from '../../../ui/statusNavigation'

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
