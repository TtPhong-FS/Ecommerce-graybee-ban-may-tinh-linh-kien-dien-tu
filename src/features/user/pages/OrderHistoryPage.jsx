import TableWrapper from '@/components/table/TableWrapper'
import { Button } from '@/components/ui/button'
import { useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { useSelector } from 'react-redux'
import useOrderHistoryColumns from '../columns/useOrderHistoryColumns'
import useOrder from '../hooks/useOrder'
import { selectOrderHistory } from '../redux/userSelector'

export const OrderHistoryPage = () => {
  const { t } = useCustomTranslate()

  const { isLoading, start, stop } = useLoading()

  const { columns } = useOrderHistoryColumns()
  const orderHistory = useSelector(selectOrderHistory)

  const { handleReload } = useOrder(start, stop)

  return (
    <div className="bg-primary-foreground p-6">
      <div className="grid grid-cols-2 py-3 pb-6">
        <h1>{t('customer:orderHistory.title')}</h1>
      </div>
      <Button onClick={handleReload} variant="secondary" className="py-5">
        Làm mới
      </Button>

      <TableWrapper columns={columns} data={orderHistory} loading={isLoading('reload')} />
    </div>
  )
}
