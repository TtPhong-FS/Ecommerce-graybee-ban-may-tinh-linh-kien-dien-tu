import { Button } from 'antd'
import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

export const ConfirmOrder = ({ confirm, setConfirm }) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount)
  return (
    <div className="sticky top-0">
      <div className="box min-w-[20rem]">
        <div className="text-[1rem]">
          <h2 className="mb-2">Thông tin đơn hàng</h2>
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-between border-b-1 border-gray-400 pb-2">
              <span>Tổng tiền</span>
              <span className="font-medium text-base font-sans ">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
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
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
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
            <Button type="primary" htmlType="submit" style={{ width: '100%', height: '2.5rem' }}>
              Đặt hàng
            </Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setConfirm(true)
              }}
              type="primary"
              htmlType="button"
              style={{ width: '100%', height: '2.5rem' }}
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
