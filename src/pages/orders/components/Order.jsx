import { Grid2 } from '@mui/material'
import { Button, Spin } from 'antd'
import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RHFInputField, RHFRadioGroup, RHFTextArea } from '../../../components/fields'
import { paymentMethod } from '../../../components/options/paymentMethod'
import { useMessage } from '../../../hooks'
import { getToken } from '../../../utils'

import CartItem from '../../../components/cart/components/CartItem'
import { AddressSelector } from '../../user/components/AddressSelector'
import { createOrder } from '../features/slice'
import { defaultValues } from '../types/schema'
import { AddressExistingSelector } from './AddressExistingSelector'
import { ConfirmOrder } from './ConfirmOrder'

export const Order = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = getToken()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const [confirm, setConfirm] = useState(false)
  const { contextHolder, messageApi } = useMessage()

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
    if (values.cartItemIds.length < 1) {
      return messageApi.warning('Hãy chọn ít nhất 1 sản phẩm để đặt hàng!')
    }
    try {
      console.log('submit', values)
      const res = await dispatch(createOrder({ request: values, token: token })).unwrap()
      if (res.status === 201) {
        messageApi(res.message)
        reset(defaultValues)
      }
    } catch (error) {
      console.log(error)
      if (error && typeof error === 'object') {
        Object.entries(error).forEach(([field, message]) => {
          setError(field, { type: 'server', message })
        })
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.warning(error.unconnect)
        }
      }
    }
  }
  return (
    <div className="">
      {contextHolder}
      {cartItems.length > 0 ? (
        <div>
          <span
            onClick={() => onUnConfirm()}
            className="text-blue-500 text-[1rem] hover:decoration-solid hover:underline cursor-pointer"
          >
            Quay trở về giỏ hàng
          </span>
          <Spin spinning={isSubmitting}>
            <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
              <Grid2 container spacing={2}>
                <Grid2 size={{ mobile: 12, tablet: 12, laptop: 8 }}>
                  <CartItem />
                  {confirm && (
                    <Grid2 container spacing={2}>
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
                          <RHFInputField
                            name="email"
                            label="Email (Không bắt buộc)"
                            type="text"
                            placeholder="Nhập email..."
                          />
                        </div>
                      </Grid2>
                      <AddressExistingSelector />
                      <Grid2 sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }} size={12}>
                        <h2 className="mb-1 sub-title">Hình thức nhận hàng</h2>
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
                          {deliveryType === 'HOME DELIVERY' ? (
                            <>
                              <h2 className="mt-2 sub-title">Phương thức giao hàng</h2>
                              <RHFRadioGroup
                                name="shippingMethod"
                                options={[
                                  {
                                    id: 1,
                                    value: 'STANDARD SHIPPING',
                                    label: 'Tiêu chuẩn'
                                  },
                                  {
                                    id: 2,
                                    value: 'ECONOMY SHIPPING',
                                    label: 'Tiết kiệm'
                                  },
                                  {
                                    id: 3,
                                    value: 'FAST DELIVERY',
                                    label: 'Nhanh'
                                  }
                                ]}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="flex flex-col gap-4">
                          <h2 className="sub-title">Địa chỉ nhận hàng</h2>
                          <Grid2 container spacing={1}>
                            <AddressSelector />
                          </Grid2>
                          <RHFInputField
                            disabled={useExistingAddress}
                            name="streetAddress"
                            label="Địa chỉ cụ thể"
                            type="text"
                            placeholder="Ví dụ: Số nhà 65 xóm..."
                          />
                          <RHFTextArea name="note" placeholder="Ghi chú (Ví dụ: Hãy gọi tôi khi chuẩn bị giao hàng)" />
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
