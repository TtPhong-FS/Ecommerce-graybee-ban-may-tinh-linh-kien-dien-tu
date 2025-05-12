import { PhoneOutlined } from '@ant-design/icons'
import { Avatar, Divider, Grid2 } from '@mui/material'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { orderHistories } from '../../../data/orderHistory'
import { deliveryType, paymentMethod } from '../../../en-vi/orderHistory'
import { colorMap, iconMap, orderStatus, paymentStatus } from '../../../en-vi/orderStatus'
import { useToDetail } from '../../../hooks'

export const OrderDetail = () => {
  const onRepurchase = (products) => {
    console.log('product', products)
  }
  const toDetail = useToDetail()
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ mobile: 12, tablet: 12, laptop: 8 }}>
        <div className="flex flex-col gap-4">
          <div className="bg-white  rounded-lg">
            <div className="flex justify-between mb-2 px-2 py-1">
              <div className="flex gap-2">
                <span>{orderHistories.orderDate}</span>
                <span className="text-gray-300">|</span>
                <span>{deliveryType[orderHistories.deliveryType]}</span>
                <span className="text-gray-300">|</span>
                <Link className="">MVB152678</Link>
                <span>{orderHistories.totalQuantity} sản phẩm</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-xs text-gray-500 font-medium">{orderHistories.paymentMethod}</span>
                {iconMap[orderHistories.status]}
                <label className="text-muted-foreground" type={colorMap[orderHistories.status]}>
                  {orderStatus[orderHistories.status]}
                </label>
              </div>
            </div>
            <Divider />
            <div>
              <div className="flex">
                <div className="flex-1">
                  <h1>Giao hàng thành công</h1>
                  <span>Rất vui vì bạn đã tin tưởng và mua hàng</span>
                </div>
                <div className="flex-1">
                  <h2>Tài xế giao hàng</h2>
                  <div>
                    <Avatar />
                    <span>
                      <span>Nguyễn Văn A</span>
                      <span>
                        <span>090908979798</span>
                        <PhoneOutlined />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="flex ">
                <div className="flex-1">
                  <h2>Thông tin người nhận</h2>
                  <div>
                    <span>{orderHistories.customerInfo.fullName}</span>
                    <span>{orderHistories.customerInfo.phoneNumber}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h2>Nhận hàng tại</h2>
                  <div>
                    <span>{orderHistories.customerInfo.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <h1>Danh sách sản phẩm</h1>
            <div className="mt-4">
              {orderHistories?.orderDetails?.map((oDetail, index) => (
                <div key={index}>
                  <div className="flex justify-between py-6 ">
                    <div className="flex-2">
                      <div className="flex gap-4">
                        <Link
                          to={`/products/${oDetail?.productName}`}
                          onClick={() => toDetail({ id: oDetail.productId, name: oDetail.productName })}
                          className="w-[60px] h-[60px] border-1 border-gray-300 rounded-md cursor-pointer"
                        >
                          <img className="p-1" width={60} height={60} src={oDetail.thumbnail} />
                        </Link>
                        <div className="flex flex-col">
                          <Link
                            to={`/products/${oDetail?.productName}`}
                            onClick={() => toDetail({ id: oDetail.productId, name: oDetail.productName })}
                            className="font-medium text-base cursor-pointer"
                          >
                            {oDetail.productName}
                          </Link>
                          <span className="text-gray-500">Số lượng: {oDetail.quantity}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-medium text-base font-sans ">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            oDetail.priceAtTime
                          )}
                        </span>
                        <span className="font-medium text-base font-sans text-red-500">
                          Thành tiền:{' '}
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            oDetail.subTotal
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Divider />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Grid2>
      <Grid2 size={{ mobile: 12, tablet: 12, laptop: 4 }}>
        <div className="sticky top-0">
          <div className="box min-w-[20rem]">
            <div className="">
              <h2 className="mb-2 sub-title">Thông tin thanh toán</h2>
              <div className="flex flex-col gap-2 text-gray-500 mb-2">
                <span className="flex items-center justify-between">
                  <span>Tổng tiền</span>
                  <span className="font-medium text-base font-sans ">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(1200000)}
                  </span>
                </span>
                <span className="flex items-center justify-between">
                  <span>Giảm giá trực tiếp</span>
                  <span className="font-medium  font-sans ">
                    - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(45000)}
                  </span>
                </span>
                <span className="flex items-center justify-between">
                  <span>Giảm giá voucher</span>
                  <span className="font-medium  font-sans text-red-500">
                    - {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(20000)}
                  </span>
                </span>
                <span className="flex items-center justify-between">
                  <span>Phí vận chuyển</span>
                  {orderHistories.shippingFax === 0 ? (
                    <span>Miễn phí</span>
                  ) : (
                    <span className="font-medium  font-sans text-red-500">
                      -{' '}
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                        orderHistories.shippingFax
                      )}
                    </span>
                  )}
                </span>
                <span className="flex items-center justify-between">
                  <span>Điểm thưởng</span>
                  <div className="flex items-center">
                    <img
                      className="w-[30px] h-[30px]"
                      src="https://img.icons8.com/?size=100&id=pHEbDnllVT05&format=png&color=000000"
                      alt=""
                    />
                    <span className="font-normal text-amber-600">+457</span>
                  </div>
                </span>
              </div>
              <div className="flex py-4 items-center justify-between border-t-1 border-gray-400">
                <h2 className="sub-title">Thành tiền</h2>
                <span className="font-medium  font-sans text-red-500">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                    orderHistories.totalAmount
                  )}
                </span>
              </div>
              <div className="py-4 border-t-1 border-gray-400">
                <div className="flex justify-between">
                  <h2 className="sub-title">Phương thức thanh toán</h2>
                  <span>
                    {iconMap[orderHistories.status]}
                    <span className="ml-2 text-green-700">{paymentStatus[orderHistories.paymentStatus]}</span>
                  </span>
                </div>

                <div className="flex py-2 items-center">
                  <img
                    className="w-[55px] h-[55px]"
                    src="https://img.icons8.com/?size=100&id=22539&format=png&color=000000"
                    alt=""
                  />
                  <span className="text-[1.14rem] font-normal ml-2">
                    {orderHistories.paymentMethod} - {paymentMethod[orderHistories.paymentMethod]}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={() => {
                  const products = orderHistories.orderDetails.map((o) => ({
                    productId: o.productId,
                    quantity: o.quantity
                  }))
                  onRepurchase(products)
                }}
                type="button"
                className="cursor-pointer h-[38px] select-none"
              >
                Mua lại
              </Button>
            </div>
          </div>
        </div>
      </Grid2>
    </Grid2>
  )
}
