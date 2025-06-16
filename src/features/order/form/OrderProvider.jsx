import { yupResolver } from '@hookform/resolvers/yup'

import { removeItemsByIds } from '@/features/cart/redux/cartSlice'
import { useLoading } from '@/hooks'
import { handleAsyncSubmit } from '@/lib'
import { Spin } from 'antd'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { createOrderAsync, setCustomerForm } from '../redux/orderSlice'
import { Order } from './Order'
import { defaultValues, Schema } from './schema'

export const OrderProvider = () => {
  const dispatch = useDispatch()
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultValues,
    shouldUnregister: false
  })

  const { isLoading, start, stop } = useLoading()

  const handleSubmit = methods.handleSubmit(async (values) => {
    console.log(values)
    start('submiting')
    if (values.cartItemIds.length < 1) {
      return toast.info('Hãy chọn ít nhất 1 sản phẩm để đặt hàng!')
    }
    const customerForm = {
      recipientName: values.customerInfo.recipientName,
      phone: values.customerInfo.recipientPhone,
      email: values.customerInfo.email,
      city: values.shippingInfo.city,
      district: values.shippingInfo.district,
      commune: values.shippingInfo.commune,
      streetAddress: values.shippingInfo.streetAddress
    }
    dispatch(setCustomerForm(customerForm))
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(createOrderAsync(vals)).unwrap(),
      values,
      onSuccess: async (res) => {
        toast.success(res.message)
        console.log(res)
        dispatch(removeItemsByIds(res.data))
      },
      toast,
      setError: methods.setError
    })
    stop('submiting')
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Spin spinning={isLoading('submiting')}>
          <Order />
        </Spin>
      </form>
    </FormProvider>
  )
}
