import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useLoading } from '@/hooks'
import { handleAsync } from '@/lib'
import { formattedDateTime } from '@/utils'
import { Banknote, Calendar, Dot, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { deliveryTypeLabels, orderStatusLabels, paymentMethodLabels, paymentStatusLabels } from '../constants'
import { cancelOrderByCodeAsync } from '../redux'
import { selectOrderHistory } from '../redux/accountSelector'

export default function OrderItem() {
  const orderHistory = useSelector(selectOrderHistory)
  const { isLoading, start, stop } = useLoading()

  const dispatch = useDispatch()

  const handleCancelOrder = async (code) => {
    start(`cancelOrder:${code}`)
    await handleAsync({
      asyncAction: (code) => dispatch(cancelOrderByCodeAsync(code)).unwrap(),
      onSuccess: (res) => {
        toast.success(res.data.message)
      },
      toast,
      values: code
    })
    stop(`cancelOrder:${code}`)
  }

  return (
    <div className="flex flex-col gap-4">
      {orderHistory?.map((o) => (
        <div className="card" key={o.code}>
          <div className="mb-4 flex justify-between items-center">
            <div className="text-xs">
              Đơn
              <Link to={`detail/${o.code}`} className="link ml-1">
                #{o.code}
              </Link>
            </div>

            {(o.status === 'PENDING' || o.status === 'CONFIRMED') && (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer ">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      disabled={isLoading(`cancelOrder:${o.code}`)}
                      onClick={() => handleCancelOrder(o.code)}
                    >
                      Huỷ đơn hàng
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col items-start mb-2 gap-2">
                <div className="text-xs flex items-center mb-2">
                  <Calendar size={16} className="mr-1" />
                  <span className="text-sm">{formattedDateTime(o.orderDate)}</span>
                </div>
                <Badge variant="outline" className="">
                  {paymentMethodLabels[o.paymentMethod]}
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="text-xs flex items-center gap-1 mb-2">
                <Banknote className="text-green-700" /> Thanh toán
              </h4>
              <Badge variant="destructive">{paymentStatusLabels[o.paymentStatus]}</Badge>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-2 items-center mb-2">
                <span className="text-xs">{deliveryTypeLabels[o.deliveryType]}</span>
                <h4 className="text-xs flex items-center ">
                  <Dot className="text-green-600" /> Trạng thái
                </h4>
              </div>
              <Badge className="bg-green-800">{orderStatusLabels[o.status]}</Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
