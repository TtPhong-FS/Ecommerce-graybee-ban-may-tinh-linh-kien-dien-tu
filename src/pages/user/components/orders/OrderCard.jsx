import { CheckCircleOutlined } from '@ant-design/icons'
import { Divider } from '@mui/material'
import { Image } from 'antd'
import React from 'react'
import { orderHistories } from '../../../../data/orderHistory'

export const OrderCard = () => {
  return (
    <div className="flex flex-col gap-4">
      {orderHistories.map((order, index) => (
        <div key={index} className="bg-white py-2 rounded-lg">
          <div className="flex justify-between mb-2 px-2 py-1">
            <div className="flex gap-2">
              <span>{order.orderDate}</span>
              <span className="text-gray-300">|</span>
              <span>{order.deliveryType}</span>
              <span className="text-gray-300">|</span>
              <span>{order.totalQuantity} sản phẩm</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-xs text-gray-500 font-medium">{order.paymentMethod}</span>
              <CheckCircleOutlined style={{ color: '#059669' }} />
              <span className="text-[#059669] font-medium">Hoàn tất</span>
            </div>
          </div>
          <Divider />
          {order.orderDetails.map((oDetail, index) => (
            <div key={index}>
              <div className="flex justify-between px-4 py-6 ">
                <div className="">
                  <div className="flex gap-2">
                    <div className="border-1 border-gray-300 p-1">
                      <Image src={oDetail.thumbnail} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-base">{oDetail.productName}</span>
                      <span className="text-gray-500">Số lượng: {oDetail.quantity}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-medium text-base font-sans ">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        oDetail.priceAtTime
                      )}
                    </span>
                    <span className="font-medium text-base font-sans text-red-500">
                      Thành tiền:{' '}
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(oDetail.subTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="px-4 mt-1 flex justify-between pb-4">
                <a href="/account/order-detail/madonhang" className="text-[#1250dc] font-medium">
                  Xem chi tiết
                </a>
              </div>
              <Divider />
            </div>
          ))}
          <span className="font-medium text-red-500 text-base flex justify-end px-4 pt-4">
            Tổng tiền:{' '}
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
          </span>
        </div>
      ))}
    </div>
  )
}
