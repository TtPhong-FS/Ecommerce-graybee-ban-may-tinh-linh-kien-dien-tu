import { Grid2 } from '@mui/material'
import { Button } from 'antd'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RHFInputField, RHFRadioGroup, RHFTextArea } from '../../../components/fields'
import { paymentMethod } from '../../../components/options/paymentMethod'
import CartItem from '../../cart/components/CartItem'
import { ConfirmOrder } from './ConfirmOrder'

export const Order = () => {
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const [confirm, setConfirm] = useState(false)

  const { handleSubmit, reset, clearErrors } = useFormContext()

  const onUnConfirm = () => {
    setConfirm(false)
    clearErrors()
  }

  const onSubmit = (values) => {
    try {
      console.log('submit', values)
      const response = ''
    } catch (error) {}
  }

  return (
    <div className="">
      {cartItems.length > 0 ? (
        <div>
          <span
            onClick={() => onUnConfirm()}
            className="text-blue-500 text-[1rem] hover:decoration-solid hover:underline cursor-pointer"
          >
            Quay trở về giỏ hàng
          </span>
          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ mobile: 12, tablet: 12, laptop: 8 }}>
                <CartItem />
                {confirm && (
                  <Grid2 container spacing={2}>
                    <Grid2 sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }} size={12}>
                      <h2 className="mb-4">Người đặt hàng</h2>
                      <div className="flex flex-col gap-3">
                        <RHFInputField name="fullName" label="Họ và tên" type="text" />
                        <RHFInputField name="phoneNumber" label="Số điện thoại" type="text" />
                        <RHFInputField name="email" label="Email (Không bắt buộc)" type="text" />
                      </div>
                    </Grid2>
                    <Grid2 sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }} size={12}>
                      <h2 className="mb-1">Hình thức nhận hàng</h2>
                      <div className="mb-3">
                        <RHFRadioGroup
                          name="deliveryType"
                          options={[
                            {
                              id: 1,
                              value: 'HOME DELIVERY',
                              label: 'Giao hàng tận nhà'
                            },
                            {
                              id: 2,
                              value: 'STORE PICKUP',
                              label: 'Nhận tại cửa hàng'
                            }
                          ]}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Grid2 container spacing={1}>
                          <Grid2 size={4}>
                            <RHFInputField name="shippingAddress.city" label="Thành phố/Tỉnh" type="text" />
                          </Grid2>
                          <Grid2 size={4}>
                            <RHFInputField name="shippingAddress.district" label="Huyện/Quận" type="text" />
                          </Grid2>
                          <Grid2 size={4}>
                            <RHFInputField name="shippingAddress.commune" label="Xã/Phường" type="text" />
                          </Grid2>
                        </Grid2>
                        <RHFInputField name="shippingAddress.streetAddress" label="Địa chỉ cụ thể" type="text" />
                        <RHFTextArea name="note" placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị giao hàng)" />
                      </div>
                    </Grid2>
                    <div className="box">
                      <h2 className="mb-1">Hình thức thanh toán</h2>
                      <div className="h-40">
                        <RHFRadioGroup name="paymentMethod" options={paymentMethod} />
                      </div>
                    </div>
                  </Grid2>
                )}
              </Grid2>
              <Grid2 sx={{ position: 'relative' }} size={{ mobile: 12, tablet: 12, laptop: 4 }}>
                <ConfirmOrder confirm={confirm} setConfirm={setConfirm} />
              </Grid2>
            </Grid2>
          </form>
        </div>
      ) : (
        <div className="place-items-center bg-white p-4 rounded-md">
          <p className="mb-8 mt-2">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Button
            style={{ height: '2.5rem', width: '100%' }}
            type="primary"
            htmlType="button"
            onClick={() => navigate('/')}
          >
            Tiếp tục mua hàng
          </Button>
        </div>
      )}
    </div>
  )
}
