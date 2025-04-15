import { yupResolver } from '@hookform/resolvers/yup'

import { FormProvider, useForm } from 'react-hook-form'

import { Schema, defaultValues } from '../types/login'
import { Login } from './Login'
export const LoginProvider = () => {
  const methods = useForm({ resolver: yupResolver(Schema), shouldUnregister: false, mode: 'all', defaultValues })
  return (
    <FormProvider {...methods}>
      <Login />
    </FormProvider>
  )
}
