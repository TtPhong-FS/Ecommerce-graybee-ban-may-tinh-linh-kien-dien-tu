import { Button } from '@/components/ui/button'
import { useAppContext, useLoading } from '@/hooks'
import { handleAsyncSubmit } from '@/lib'
import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { updateProfileAsync } from '../../redux'
import { Profile } from './Profile'
import { defaultValues, Schema } from './schema'

export const ProfileProvider = ({ handleCancel, initialData, isUpdate }) => {
  const { dispatch } = useAppContext()

  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: defaultValues,
    mode: 'all',
    shouldUnregister: false
  })

  const { isLoading, start, stop } = useLoading()

  const date = useMemo(() => new Date(initialData.birthday), [initialData])

  useEffect(() => {
    if (initialData !== null && isUpdate) {
      methods.reset({
        ...initialData,
        birthday: {
          day: String(date.getDate()).padStart(2, '0'),
          month: String(date.getMonth() + 1).padStart(2, '0'),
          year: date.getFullYear()
        }
      })
    }
  }, [initialData, methods, isUpdate, date])

  const onSubmit = methods.handleSubmit(async (values) => {
    const formatted = `${values.birthday.year}-${String(values.birthday.month).padStart(2, '0')}-${String(
      values.birthday.day
    ).padStart(2, '0')}`
    const request = { ...values, birthday: formatted }
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(updateProfileAsync(vals)).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)
        handleCancel()
      },
      toast,
      setError: methods.setError,
      values: request,
      loadingKey: 'updating',
      startLoading: start,
      stopLoading: stop
    })
  })

  return (
    isUpdate && (
      <FormProvider {...methods}>
        <form className="bg-white p-4 rounded-lg" onSubmit={onSubmit}>
          <Button variant="link" onClick={handleCancel} className="mb-4 cursor-pointer link" type="button">
            Quay lại
          </Button>
          <Profile isLoading={isLoading} handleCancel={handleCancel} />
          <div className="flex items-center justify-center">
            <Button
              disabled={isLoading('updating')}
              variant="secondary"
              className=" mt-4 w-80 cursor-pointer py-5"
              type="submit"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </FormProvider>
    )
  )
}

ProfileProvider.propTypes = {
  handleCancel: PropTypes.func,
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool
}
