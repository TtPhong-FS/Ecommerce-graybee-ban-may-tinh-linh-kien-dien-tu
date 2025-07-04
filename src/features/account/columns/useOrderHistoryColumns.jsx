import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useLoading } from '@/hooks'
import { handleAsync } from '@/lib'
import { formattedDateTime, formattedPrice } from '@/utils'
import { createColumnHelper } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { cancelOrderByCodeAsync } from '../redux'

export default function useOrderHistoryColumns() {
  const dispatch = useDispatch()
  const columnHelper = createColumnHelper()
  const { isLoading, start, stop } = useLoading()

  const handleCancelOrderById = async (code) => {
    await handleAsync({
      asyncAction: (code) => dispatch(cancelOrderByCodeAsync(code)).unwrap(),
      onSuccess: (res) => {
        toast.success(res.message)
      },
      values: code,
      loadingKey: `cancelOrder:${code}`,
      startLoading: start,
      stopLoading: stop
    })
  }

  return {
    columns: [
      columnHelper.accessor('code', {
        header: 'Mã đơn hàng',
        cell: ({ getValue }) => {
          const code = getValue()
          return <Link to={`detail/${code?.toLowerCase()}`}>{getValue()}</Link>
        }
      }),
      columnHelper.accessor('totalAmount', {
        header: 'Tổng tiền',
        cell: ({ getValue }) => {
          const totalAmount = getValue()
          const formatted = formattedPrice(totalAmount)
          return <span className="text-error">{formatted}</span>
        }
      }),
      columnHelper.accessor('deliveryType', {
        header: 'Hình thức nhận hàng',
        cell: ({ getValue }) => {
          return <Badge variant="secondary">{getValue()}</Badge>
        }
      }),
      columnHelper.accessor('paymentMethod', {
        header: 'Phương thức thanh toán',
        cell: ({ getValue }) => {
          return <Badge variant="secondary">{getValue()}</Badge>
        }
      }),
      columnHelper.accessor('paymentStatus', {
        header: 'Trạng thái thanh toán',
        cell: ({ getValue }) => {
          return <Badge variant={getValue() === 'UNPAID' ? 'destructive' : 'default'}>{getValue()}</Badge>
        }
      }),
      columnHelper.accessor('shippingMethod', {
        header: 'Phương thức giao hàng',
        cell: ({ getValue }) => {
          return <Badge variant="outline">{getValue()}</Badge>
        }
      }),
      columnHelper.accessor('orderDate', {
        header: 'Ngày đặt',
        cell: ({ getValue }) => {
          const orderDate = getValue()
          const formatted = formattedDateTime(orderDate)
          return <div className="">{formatted}</div>
        }
      }),
      columnHelper.accessor('status', {
        header: 'Trạng thái',
        cell: ({ getValue }) => {
          return <Badge variant="secondary">{getValue()}</Badge>
        }
      }),
      columnHelper.display({
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
          const code = row.original.code
          const orderStatus = row.original.status
          const isAllowCancel = orderStatus === 'PENDING' || orderStatus === 'CONFIRMED' || orderStatus === 'PROCESSING'
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer ">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              {isAllowCancel && (
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    disabled={isLoading(`cancelOrder:${code}`)}
                    onClick={() => handleCancelOrderById(code)}
                  >
                    Huỷ đơn hàng
                  </DropdownMenuItem>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          )
        }
      })
    ]
  }
}
