import { Input, Tabs } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useMessage } from '../../../hooks'
import { OrderCard } from '../components/OrderCard'
import { findOrdersByStatusOptional } from '../features'

const items = [
  {
    key: 'all',
    label: 'Tất cả'
  },
  {
    key: 'processing',
    label: 'Đang xử lý'
  },
  {
    key: 'delivered',
    label: 'Đang giao'
  },
  {
    key: 'completed',
    label: 'Hoàn tất'
  },
  {
    key: 'cancelled',
    label: 'Đã huỷ'
  },
  {
    key: 'refuned',
    label: 'Trả hàng'
  }
]

export const OrderHistoryPage = () => {
  const [activeKey, setActiveKey] = useState('all')
  const dispatch = useDispatch()
  const { contextHolder, messageApi } = useMessage()
  const orders = useSelector((state) => state.account.orders, shallowEqual)
  const data = orders['all']
  const isFetch = useRef(false)
  useEffect(() => {
    if (!isFetch.current && (!data || data.length === 0)) {
      dispatch(findOrdersByStatusOptional('all'))
      isFetch.current = true
    }
  }, [])

  const handleFindOrderByStatus = async (key) => {
    setActiveKey(key)
    if (key === 'all') {
      try {
        const res = await dispatch(findOrdersByStatusOptional('all')).unwrap()
        if (res.data?.status === 200) {
          messageApi.success(res.data?.message)
        }
      } catch (error) {
        if (error && typeof error === 'object') {
          if (error.general) {
            messageApi.error(error.general)
          } else if (error.unconnect) {
            messageApi.error(error.unconnect)
          } else {
            messageApi.error(error.detail)
          }
        }
      }
    } else {
      try {
        const res = await dispatch(findOrdersByStatusOptional(key)).unwrap()
        if (res.data?.status === 200) {
          messageApi.success(res.data?.message)
        }
      } catch (error) {
        if (error && typeof error === 'object') {
          if (error.general) {
            messageApi.error(error.general)
          } else if (error.unconnect) {
            messageApi.error(error.unconnect)
          } else {
            messageApi.error(error.detail)
          }
        }
      }
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="grid grid-cols-2 py-3 pb-6">
        <h1>Lịch sử mua hàng</h1>
        <Input.Search placeholder="Nhập mã đơn hàng hoặc tên sản phẩm để tìm kiếm..." />
      </div>
      <Tabs
        tabBarStyle={{ backgroundColor: 'white', borderRadius: '10x 10px 0 0' }}
        centered
        size="middle"
        defaultActiveKey="all"
        items={items.map((item) => ({
          ...item,
          children: <OrderCard status={item.key === activeKey ? item.key : 'all'} />
        }))}
        onChange={handleFindOrderByStatus}
      />
    </div>
  )
}
