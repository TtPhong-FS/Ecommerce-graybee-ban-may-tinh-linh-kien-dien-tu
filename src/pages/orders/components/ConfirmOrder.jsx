import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import PropTypes from 'prop-types'
import { useFormContext, useWatch } from 'react-hook-form'

import { useSelector } from 'react-redux'

export const ConfirmOrder = ({ confirm, setConfirm }) => {
  const {
    control,
    formState: { isSubmitting }
  } = useFormContext()

  const cartItemIds = useWatch({ control, name: 'cartItemIds' })

  const cartItems = useSelector((state) => state.cart.cartItems)

  const tolal = cartItems?.filter((item) => cartItemIds.includes(item.id)).reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="sticky top-24">
      <div className="box min-w-[20rem]">
        <div className="text-[1rem]">
          <h2 className="mb-2">Thông tin đơn hàng</h2>
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-between border-b-1 border-gray-400 pb-2">
              <span>Tổng tiền</span>
              <span className="font-medium text-base font-sans ">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tolal)}
              </span>
            </span>
            <span className="flex items-center justify-between border-b-1 border-dashed border-gray-400 pb-2">
              <span>Tổng khuyến mãi</span>
              <span className="font-medium  font-sans ">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)}
              </span>
            </span>
            <span className="flex items-center justify-between">
              <span>Tiền thanh toán</span>
              <span className="font-medium  font-sans text-red-500">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tolal)}
              </span>
            </span>
            <span className="flex items-center justify-between">
              <span>Điểm thưởng</span>
              <span className="font-medium  font-sans ">0</span>
            </span>
          </div>
        </div>
        <div className="mt-4">
          {confirm ? (
            <Button disabled={isSubmitting} type="submit" className="cursor-pointer bg-secondary">
              {isSubmitting ? (
                <span>
                  <LoaderCircle className="animate-spin mr-2" />
                  Đang xử lý
                </span>
              ) : (
                'Đặt hàng'
              )}
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setConfirm(true)
              }}
              type="button"
              variant="secondary"
              className="cursor-pointer h-[38px]"
            >
              Xác nhận đơn
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

ConfirmOrder.propTypes = { confirm: PropTypes.bool, setConfirm: PropTypes.func }
