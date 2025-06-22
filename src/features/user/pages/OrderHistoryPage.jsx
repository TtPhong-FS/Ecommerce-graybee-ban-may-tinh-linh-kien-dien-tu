import { Button } from '@/components/ui/button'
import { useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import OrderItem from '../components/OrderItem'
import useOrder from '../hooks/useOrder'
import { fetchAllOrderHistoryAsync } from '../redux'

export const OrderHistoryPage = () => {
  const { t } = useCustomTranslate()

  const dispatch = useDispatch()
  const { isLoading, start, stop } = useLoading()

  const { handleReload } = useOrder(start, stop)

  const isFetch = useRef(false)
  useEffect(() => {
    if (!isFetch.current) {
      dispatch(fetchAllOrderHistoryAsync())
    }
    isFetch.current = true
  }, [dispatch])

  return (
    <div className=" p-6">
      <Outlet />
      <div className="flex items-center justify-between mb-8">
        <h1>{t('customer:orderHistory.title')}</h1>
        <Button onClick={handleReload} variant="secondary" disabled={isLoading('reload')} className="py-5 w-25">
          Làm mới
        </Button>
      </div>
      <OrderItem />
    </div>
  )
}
