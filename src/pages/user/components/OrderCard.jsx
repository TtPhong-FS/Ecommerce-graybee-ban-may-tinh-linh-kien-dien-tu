import { Divider } from '@mui/material'
import { Image } from 'antd'
import PropTypes from 'prop-types'
import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deliveryType } from '../../../en-vi/orderHistory'
import { colorMap, iconMap, orderStatus } from '../../../en-vi/orderStatus'
export const OrderCard = ({ status }) => {
  const orders = useSelector((state) => state.account.orders, shallowEqual)
  const orderMap = orders[status]
  return (
    <div className="flex flex-col gap-4">
      {orderMap?.map((order, index) => (
        <div key={index} className="bg-white py-2 rounded-lg">
          <div className="flex justify-between mb-2 px-2 py-1">
            <div className="flex gap-2 text-sm">
              <span>{order.orderDate}</span>
              <span className="text-gray-300">|</span>
              <span>{deliveryType[order.deliveryType]}</span>
              <span className="text-gray-300">|</span>
              <span>{order.totalQuantity} sản phẩm</span>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <span className="text-xs text-gray-500 font-medium">{order.paymentMethod}</span>
              {iconMap[order.status]}
              <span className="text-muted-foreground" type={colorMap[order.status]}>
                {orderStatus[order.status]}
              </span>
            </div>
          </div>
          <Divider />
          {order?.orderDetails?.map((oDetail, index) => (
            <div key={index}>
              <div className="flex justify-between px-4 py-6 text-sm">
                <div className="flex-2">
                  <div className="flex gap-4">
                    <div className="w-[60px] h-[60px] border-1 border-gray-300 rounded-md">
                      <Image className="p-1" width={60} height={60} src={oDetail.thumbnail} />
                    </div>
                    <div className="flex flex-col ">
                      <Link to={'/'} className="font-medium link line-clamp-2 max-w-[20rem]">
                        {oDetail.productName}
                      </Link>
                      <span className="text-gray-500">Số lượng: {oDetail.quantity}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col items-end gap-1 ">
                    <span className="font-medium font-sans ">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        oDetail.priceAtTime
                      )}
                    </span>
                    <span className="font-medium font-sans text-red-500">
                      Thành tiền:{' '}
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(oDetail.subTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-4 mt-1 flex justify-between pb-4">
                <Link to="/account/order-detail/madonhang" className="link">
                  Xem chi tiết
                </Link>
              </div>
              <Divider />
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-2 text-sm">
            <Link className="link">MVB152678</Link>
            <span className="font-medium text-red-500  flex justify-end">
              Tổng tiền:{' '}
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

OrderCard.propTypes = {
  status: PropTypes.string
}
