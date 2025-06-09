import { Input } from '@/components/ui/input'
import { useCustomTranslate } from '@/i18n'
import { handleAsync } from '@/lib'
import { Tabs } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { OrderCard } from '../components'
import { fetchOrdersByStatusOptionalAsync } from '../redux'

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
  const { t } = useCustomTranslate()
  const [activeKey, setActiveKey] = useState('all')
  const dispatch = useDispatch()

  const orders = useSelector((state) => state.account.orders, shallowEqual)
  const data = orders['all']
  const isFetch = useRef(false)

  useEffect(() => {
    if (!isFetch.current && (!data || data.length === 0)) {
      dispatch(fetchOrdersByStatusOptionalAsync('all'))
      isFetch.current = true
    }
  }, [])

  const handleFindOrderByStatus = async (key) => {
    setActiveKey(key)
    if (key === 'all') {
      await handleAsync({
        asyncAction: () => dispatch(fetchOrdersByStatusOptionalAsync('all')).unwrap(),
        toast,
        onSuccess: (res) => {
          toast.success(res.message)
        }
      })
    } else {
      await handleAsync({
        asyncAction: () => dispatch(fetchOrdersByStatusOptionalAsync(key)).unwrap(),
        toast,
        onSuccess: (res) => {
          toast.success(res.message)
        }
      })
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 py-3 pb-6">
        <h1>{t('customer:orderHistory.title')}</h1>
        <div>
          <Input
            type="search"
            className="h-[38px] bg-primary-foreground"
            placeholder={`${t('customer:orderHistory.search')}`}
          />
        </div>
      </div>
      {Object.keys(orders)?.length !== 0 ? (
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
      ) : (
        <div className="p-4 text-sm rounded-md text-center select-none bg-primary-foreground text-muted-foreground">
          {t('customer:orderHistory.empty')}
        </div>
      )}
    </div>
  )
}
