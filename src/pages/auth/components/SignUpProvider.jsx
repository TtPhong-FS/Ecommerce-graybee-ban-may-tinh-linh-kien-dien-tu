import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { defaultValues, Schema } from '../types/signup'
import { SignUp } from './SignUp'

export const SignUpProvider = () => {
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultValues,
    mode: 'all',
    shouldUnregister: false
  })
  return (
    <FormProvider {...methods}>
      <SignUp />
    </FormProvider>
  )
}
