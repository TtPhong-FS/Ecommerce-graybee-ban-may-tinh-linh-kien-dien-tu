import { Grid2 } from '@mui/material'
import { Spin } from 'antd'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RHFInputField, RHFRadioGroup, RHFTextArea } from '../../../components/fields'
import { paymentMethod } from '../../../components/options/paymentMethod'

import { Button } from '@/components/ui/button'
import CartItem from '../../../components/cart/components/CartItem'
import { AddressSelector } from '../../user/components/AddressSelector'
import { AddressExistingSelector } from './AddressExistingSelector'
import { ConfirmOrder } from './ConfirmOrder'

export const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cartItems = useSelector((state) => state.cart.cartItems)
  const [confirm, setConfirm] = useState(false)

  const {
    handleSubmit,
    reset,
    setError,
    clearErrors,
    control,
    formState: { isSubmitting }
  } = useFormContext()

  const deliveryType = useWatch({ control, name: 'deliveryType' })
  const useExistingAddress = useWatch({ control, name: 'useExistingAddress' })

  const onUnConfirm = () => {
    setConfirm(false)
    clearErrors()
  }

  const onSubmit = async (values) => {
    console.log('values', values)
    // if (values.cartItemIds.length < 1) {
    //   openNotificationWithIcon('warning', 'Lời nhắc', 'Hãy chọn ít nhất 1 sản phẩm để đặt hàng!')
    //   return
    // }
    // await handleAsyncSubmit({
    //   asyncAction: (vals) => dispatch(createOrder({ request: vals })).unwrap(),
    //   values,
    //   onSuccess: async (res) => {
    //     console.log(res)
    //     dispatch(removeItemsByIds(res.data))
    //     openNotificationWithIcon('success', 'Thành công', res.message)
    //   },
    //   openNotificationWithIcon,
    //   reset,
    //   defaultValues,
    //   setError
    // })
  }
  return (
    <div className="">
      {cartItems.length > 0 ? (
        <div>
          {confirm && (
            <div className="mb-4">
              <span
                onClick={() => onUnConfirm()}
                className="text-blue-500 text-[1rem] hover:decoration-solid hover:underline cursor-pointer"
              >
                Quay trở về giỏ hàng
              </span>
            </div>
          )}
          <Spin spinning={isSubmitting}>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <Grid2 container spacing={2}>
                <Grid2 size={{ mobile: 12, tablet: 12, laptop: 8 }}>
                  <CartItem />
                  {confirm && (
                    <Grid2 container spacing={2} mt={2}>
                      <Grid2 sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }} size={12}>
                        <h2 className="mb-4 sub-title">Người đặt hàng</h2>
                        <div className="flex flex-col gap-3">
                          <RHFInputField
                            disabled={useExistingAddress}
                            name="fullName"
                            label="Họ và tên"
                            type="text"
                            placeholder="Nhập họ và tên..."
                          />
                          <RHFInputField
                            disabled={useExistingAddress}
                            name="phoneNumber"
                            label="Số điện thoại"
                            type="text"
                            placeholder="Nhập số điện thoại..."
                          />
                          <RHFInputField name="email" label="Email (Không bắt buộc)" type="text" />
                        </div>
                      </Grid2>
                      <AddressExistingSelector />
                      <Grid2
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }}
                        size={12}
                      >
                        <div>
                          <h2 className="mb-2 sub-title">Hình thức nhận hàng</h2>
                          <RHFRadioGroup
                            name="deliveryType"
                            options={[
                              {
                                value: 'HOME_DELIVERY',
                                label: 'Giao hàng tận nhà'
                              },
                              {
                                value: 'STORE_PICKUP',
                                label: 'Nhận tại cửa hàng'
                              }
                            ]}
                          />
                        </div>
                        {deliveryType === 'HOME_DELIVERY' && (
                          <div>
                            <h2 className="mb-2 sub-title">Phương thức giao hàng</h2>
                            <RHFRadioGroup
                              name="shippingMethod"
                              options={[
                                {
                                  value: 'STANDARD_SHIPPING',
                                  label: 'Tiêu chuẩn'
                                },
                                {
                                  value: 'ECONOMY_SHIPPING',
                                  label: 'Tiết kiệm'
                                },
                                {
                                  value: 'FAST_DELIVERY',
                                  label: 'Nhanh'
                                }
                              ]}
                            />
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <h2 className="sub-title">Địa chỉ nhận hàng</h2>
                          <div className="flex flex-col gap-2">
                            <AddressSelector />
                            <RHFInputField
                              disabled={useExistingAddress}
                              name="streetAddress"
                              label="Địa chỉ cụ thể"
                              type="text"
                              placeholder="Ví dụ: Số nhà 65 xóm..."
                            />
                            <RHFTextArea
                              name="note"
                              label="Ghi chú"
                              placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị giao hàng)"
                            />
                          </div>
                        </div>
                      </Grid2>
                      <div className="box">
                        <h2 className="mb-1 sub-title">Hình thức thanh toán</h2>
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
          </Spin>
        </div>
      ) : (
        <div className="place-items-center bg-white p-4 rounded-md">
          <p className="mb-8 mt-2 text-muted-foreground">Bạn chưa có sản phẩm nào trong giỏ hàng!</p>
          <Button className="cursor-pointer h-[40px]" variant="secondary" type="button" onClick={() => navigate('/')}>
            Tiếp tục mua hàng
          </Button>
        </div>
      )}
    </div>
  )
}
