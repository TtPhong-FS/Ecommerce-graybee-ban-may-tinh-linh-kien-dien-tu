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

  return (
    <FormProvider {...methods}>
      <Order />
    </FormProvider>
  )
}
