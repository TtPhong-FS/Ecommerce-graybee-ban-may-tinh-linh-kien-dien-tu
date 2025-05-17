import { handleAsyncSubmit } from '@/components/func'
import useAppContext from '@/hooks/useAppContext'
import useLoading from '@/hooks/useLoading'
import { yupResolver } from '@hookform/resolvers/yup'
import { parse } from 'date-fns'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateProfileAsync } from '../features'
import { defaultValues, Schema } from '../types/schema'
import { Profile } from './Profile'

export const ProfileProvider = ({ handleCancel, initialData, isUpdate }) => {
  const { dispatch } = useAppContext()

  const methods = useForm({ resolver: yupResolver(Schema), defaultValues, mode: 'all', shouldUnregister: false })

  const { isLoading, start, stop } = useLoading()

  useEffect(() => {
    if (initialData !== null && isUpdate) {
      methods.reset({
        ...initialData,
        dateOfBirth: parse(initialData.dateOfBirth, 'MM/dd/yyyy', new Date())
      })
    }
  }, [initialData, methods, isUpdate])

  const onSubmit = methods.handleSubmit(async (values) => {
    const formatDateOfBirth = new Date(values?.dateOfBirth).toLocaleDateString('en-CA')
    const filtedValues = omit(values, ['uid'])
    const dataToSend = { ...filtedValues, dateOfBirth: formatDateOfBirth }
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(updateProfileAsync(vals)).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)
        handleCancel()
      },
      toast,
      setError: methods.setError,
      values: dataToSend,
      loadingKey: 'updating',
      startLoading: start,
      stopLoading: stop
    })
  })

  return (
    <FormProvider {...methods}>
      {isUpdate && (
        <form onSubmit={onSubmit}>
          <Profile isLoading={isLoading} handleCancel={handleCancel} />
        </form>
      )}
    </FormProvider>
  )
}

ProfileProvider.propTypes = {
  handleCancel: PropTypes.func,
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool
}
