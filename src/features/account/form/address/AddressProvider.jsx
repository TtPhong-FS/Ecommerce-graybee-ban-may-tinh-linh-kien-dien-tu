import { Button } from '@/components/ui/button'
import { useAppContext, useLoading } from '@/hooks'
import { handleAsyncSubmit } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import { Spin } from 'antd'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { createAddressAsync, updateAddressByIdAsync } from '../../redux'
import { Address } from './Address'
import { defaultValues, Schema } from './schema'

export const AddressProvider = ({ isUpdate, initialData }) => {
  const { isLoading, start, stop } = useLoading()
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultValues,
    mode: 'all',
    shouldUnregister: false
  })
  const { dispatch, navigate } = useAppContext()
  useEffect(() => {
    if (initialData !== null && isUpdate) {
      methods.reset({
        ...initialData
      })
    }
  }, [initialData, methods, isUpdate])

  const handleSubmit = methods.handleSubmit(async (values) => {
    const request = omit(values, ['id'])
    start('submiting')
    await handleAsyncSubmit({
      asyncAction: (vals) =>
        dispatch(
          isUpdate ? updateAddressByIdAsync({ request: request, id: values.id }) : createAddressAsync(vals)
        ).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)
        navigate('/account/address')
      },
      setError: methods.setError,
      toast,
      values: values
    })
    stop('submiting')
  })

  return (
    <FormProvider {...methods}>
      <Spin spinning={isLoading('submiting')}>
        <form onSubmit={handleSubmit}>
          <Address />
          <div className="px-4 mt-6">
            <Button variant="secondary" className=" cursor-pointer w-full py-5">
              {isUpdate ? 'Cập nhật' : 'Tạo địa chỉ'}
            </Button>
          </div>
        </form>
      </Spin>
    </FormProvider>
  )
}
AddressProvider.propTypes = {
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool
}
