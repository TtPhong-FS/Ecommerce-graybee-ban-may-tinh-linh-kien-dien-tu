import { Button } from '@/components/ui/button'
import { useCustomTranslate } from '@/i18n'
import { ArrowLeft, ChevronLeft, LoaderCircle, Send, ShoppingCart } from 'lucide-react'
import PropTypes from 'prop-types'
import { useFormContext, useWatch } from 'react-hook-form'

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const ConfirmOrder = ({ confirm, setConfirm, onUnConfirm }) => {
  const {
    control,
    formState: { isSubmitting }
  } = useFormContext()

  const { t } = useCustomTranslate()

  const cartItemIds = useWatch({ control, name: 'cartItemIds' })

  const cartItems = useSelector((state) => state.cart.cartItems)

  const tolal = cartItems
    ?.filter((item) => cartItemIds.includes(item.cartItemId))
    .reduce((sum, item) => sum + item.totalAmount, 0)

  return (
    <div className="sticky top-24">
      <Button asChild className="cursor-pointer py-5 mb-4 ">
        <Link className="link" to="/home">
          <ChevronLeft /> {t('order:continueShopping')}
        </Link>
      </Button>
      <div className="card">
        <div className="text-[1rem]">
          <h2 className="mb-2">Thông tin đơn hàng</h2>
          <div className="flex flex-col gap-2">
            <span className="flex items-center text-sm justify-between border-b-1 border-gray-400 pb-2">
              <span>Tổng tiền</span>
              <span className="font-medium text-base font-sans ">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tolal)}
              </span>
            </span>
            <span className="flex items-center text-sm justify-between border-b-1 border-dashed border-gray-400 pb-2">
              <span>Tổng khuyến mãi</span>
              <span className="font-medium  font-sans ">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(0)}
              </span>
            </span>
            <span className="flex items-center text-sm justify-between">
              <span>Tiền thanh toán</span>
              <span className="font-medium  font-sans text-red-500">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(tolal)}
              </span>
            </span>
            <span className="flex items-center text-sm justify-between">
              <span>Điểm thưởng</span>
              <span className="font-medium  font-sans ">0</span>
            </span>
          </div>
        </div>
        <div className="flex gap-3 items-center mt-4">
          {confirm && (
            <div className="w-full">
              <Button variant="outline" className="cursor-pointer py-5 w-full select-none" onClick={onUnConfirm}>
                <ArrowLeft size={16} /> Quay lại giỏ hàng
              </Button>
            </div>
          )}
          <div className="w-full">
            {confirm ? (
              <Button variant="secondary" disabled={isSubmitting} type="submit" className="cursor-pointer w-full py-5">
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin mr-2" />
                    Đang xử lý
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Xác nhận đặt hàng
                  </>
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
                className="cursor-pointer py-5 select-none w-full"
              >
                <ShoppingCart size={16} />
                Đặt hàng
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

ConfirmOrder.propTypes = { confirm: PropTypes.bool, setConfirm: PropTypes.func, onUnConfirm: PropTypes.func }
