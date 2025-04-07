import { yupResolver } from '@hookform/resolvers/yup'
import { parse } from 'date-fns'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { defaultValues, Schema } from '../types/schema'
import { Profile } from './Profile'

export const ProfileProvider = ({ handleCancel, initialData, isUpdate }) => {
  const [loading, setLoading] = useState(true)

  const methods = useForm({ resolver: yupResolver(Schema), defaultValues, mode: 'all', shouldUnregister: false })

  useEffect(() => {
    if (initialData) {
      methods.reset({
        ...initialData,
        dateOfBirth: parse(initialData.dateOfBirth, 'MM/dd/yyyy', new Date())
      })
    }
    setLoading(false)
  }, [initialData, methods])

  return loading ? (
    <div>Loading...</div>
  ) : (
    <FormProvider {...methods}>{isUpdate && <Profile handleCancel={handleCancel} />}</FormProvider>
  )
}

ProfileProvider.propTypes = {
  handleCancel: PropTypes.func,
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool
}
