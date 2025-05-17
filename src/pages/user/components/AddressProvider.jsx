import { handleAsyncSubmit } from '@/components/func'
import useAppContext from '@/hooks/useAppContext'
import useLoading from '@/hooks/useLoading'
import { yupResolver } from '@hookform/resolvers/yup'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createAddressAsync, updateAddressAsync } from '../features'
import { defaultValues, Schema } from '../types/address'
import { Address } from './Address'

export const AddressProvider = ({ isUpdate, initialData, onClose }) => {
  const { isLoading, start, stop } = useLoading()
  const methods = useForm({ resolver: yupResolver(Schema), defaultValues, mode: 'all', shouldUnregister: false })
  const { dispatch } = useAppContext()
  useEffect(() => {
    if (initialData !== null && isUpdate) {
      methods.reset({
        ...initialData
      })
    } else {
      methods.reset(methods.formState.defaultValues)
    }
  }, [initialData, methods, isUpdate])

  const onSubmit = methods.handleSubmit(async (values) => {
    console.log(values)
    const request = omit(values, ['id'])
    await handleAsyncSubmit({
      asyncAction: (vals) =>
        dispatch(
          isUpdate ? updateAddressAsync({ request: request, id: values.id }) : createAddressAsync(vals)
        ).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)
      },
      setError: methods.setError,
      toast,
      values: request,
      loadingKey: 'updating',
      startLoading: start,
      stopLoading: stop
    })
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Address isUpdate={isUpdate} isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
AddressProvider.propTypes = {
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool,
  onClose: PropTypes.func
}
