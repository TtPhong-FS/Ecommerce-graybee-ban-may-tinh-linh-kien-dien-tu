import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, useForm } from 'react-hook-form'
import { Schema, defaultValues } from '../types/schema'
import { Order } from './Order'

export const OrderProvider = () => {
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultValues,
    shouldUnregister: false
  })

  const onSubmit = methods.handleSubmit(async (values) => {
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
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Order />
      </form>
    </FormProvider>
  )
}
