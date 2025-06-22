import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { formattedPrice } from '@/utils'
import { Image, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { orderStatusLabels, paymentStatusLabels } from '../constants'
import { getOrderDetailByCode } from '../redux'

const mockData = {
  orderCode: 'I8RHJKLZUMJE',
  orderItems: [
    {
      quantity: 60,
      subtotal: 1.146054e9,
      priceAtTime: 1.91009e7,
      productId: 4,
      productName: 'Laptop Asus Zenbook 14 Ux3405ca Pz368ws',
      slug: 'laptop-asus-zenbook-14-ux3405ca-pz368ws',
      thumbnail: 'http://res.cloudinary.com/dqntp2s9q/image/upload/v1749986574/usorcxjd7i27t4lucb0f.webp'
    }
  ],
  status: 'COMPLETED',
  delivery: {
    shippingMethod: 'FAST',
    deliveryType: 'STORE_PICKUP',
    status: 'COMPLETED',
    recipientName: 'Trần Thanh Phong',
    recipientPhone: '0393150468',
    shippingAddress: 'Xóm 4 xâm động, Xã Vân Tảo, Huyện Thường Tín, Hà Nội',
    estimatedDeliveryDate: '2025-06-29'
  },
  payment: {
    paymentMethod: 'COD',
    paymentStatus: 'UNPAID'
  }
}

export const OrderDetail = () => {
  const { code } = useParams()
  const { navigate, dispatch } = useAppContext()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  useEffect(() => {
    handleAsync({
      asyncAction: (code) => dispatch(getOrderDetailByCode(code)).unwrap(),
      onSuccess: (res) => {
        setLoading(false)
        setData(res.data)
      },
      values: code
    })
  }, [code, dispatch])

  const orderDetail = useSelector((state) => state.account.orderDetail)

  const handleClose = () => {
    navigate(-1)
  }

  return (
    <Spin spinning={loading}>
      <Dialog open onOpenChange={handleClose}>
        <DialogContent className="DialogContent">
          <DialogHeader>
            <DialogTitle className="text-muted-foreground">Đơn hàng #{code}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-6">
              <div className="card flex-3">
                <h2 className="mb-4">Sản phẩm</h2>
                <div className="select-none flex ">
                  <table className="w-full">
                    <thead className="w-full">
                      <tr className="grid grid-cols-5 text-center place-items-center w-full">
                        <th className="mb-2"></th>
                        <th className="mb-2">Sản phẩm</th>
                        <th className="mb-2">Giá lúc mua</th>
                        <th className="mb-2">Số lượng</th>
                        <th className="mb-2 text-end">Tạm tính</th>
                      </tr>
                    </thead>
                    <tbody className="w-full flex flex-col gap-3">
                      {data?.orderItems?.map((item) => (
                        <tr className="grid grid-cols-5 w-full place-items-center  text-center" key={item.id}>
                          <td>
                            <Image
                              className="border-1 p-2 border-gray-300 rounded-md"
                              style={{ minWidth: 60, minHeight: 65, maxWidth: 60, maxHeight: 65 }}
                              width={60}
                              height={65}
                              src={item.thumbnail}
                              alt="Anh san pham"
                            />
                          </td>
                          <td className="">
                            <Link
                              to={`/products/${item.slug}`}
                              className="cursor-pointer text-xs md:text-sm font-medium line-clamp-2 max-w-[20rem] link "
                            >
                              {item.productName}
                            </Link>
                          </td>
                          <td>
                            <span className="font-medium text-sm lg:text-base font-sans text-red-500">
                              {formattedPrice(item.priceAtTime)}
                            </span>
                          </td>
                          <td>
                            <span>{item.quantity}</span>
                          </td>
                          <td className="text-end">
                            <span className="font-medium text-sm lg:text-base font-sans text-red-500">
                              {formattedPrice(item.subtotal)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                {/* top */}
                <div className="card">
                  <h2 className="font-semibold mb-4">Tổng quát</h2>
                  <div>
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground">Tạm tính</Label>
                      <span>{formattedPrice(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground">Giảm giá</Label>
                      <span className="text-red-600">-{formattedPrice(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground">Tax</Label>
                      <span>{formattedPrice(0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground">Tạm tính</Label>
                      <span>{formattedPrice(20000)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-muted-foreground">Phí vận chuyển</Label>
                      <span>{formattedPrice(20000)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-1 border-t">
                      <Label className="text-muted-foreground">Tổng tiền</Label>
                      <span className="text-red-600 text-xl">{formattedPrice(data?.totalAmount - 40000)}</span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h2 className="mb-4">Trạng thái đơn hàng</h2>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Trạng thái thanh toán</Label>
                      <Badge variant="destructive">{paymentStatusLabels[data?.payment.paymentStatus]}</Badge>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Trạng thái đơn hàng</Label>
                      <Badge className="bg-green-900">{orderStatusLabels[data?.status]}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 w-max rounded-md">
              <h2 className="mb-4">Địa chỉ giao hàng</h2>
              <div className="flex flex-col gap-3">
                <div>
                  <Label>Tên người nhận</Label>
                  {data?.delivery.recipientName}
                </div>
                <div>
                  <Label>Số điện thoại</Label>
                  {data?.delivery.recipientPhone}
                </div>
                <div>
                  <Label>Ngày giao dự kiến</Label>
                  {data?.delivery.estimatedDeliveryDate}
                </div>
                <div>
                  <Label>Địa chỉ</Label>
                  {data?.delivery.shippingAddress}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Spin>
  )
}
