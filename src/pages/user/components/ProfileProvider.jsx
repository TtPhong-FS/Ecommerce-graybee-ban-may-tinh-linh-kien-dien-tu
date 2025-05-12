import { yupResolver } from '@hookform/resolvers/yup'
import { parse } from 'date-fns'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { defaultValues, Schema } from '../types/schema'
import { Profile } from './Profile'

export const ProfileProvider = ({ handleCancel, initialData, isUpdate }) => {
  const methods = useForm({ resolver: yupResolver(Schema), defaultValues, mode: 'all', shouldUnregister: false })

  useEffect(() => {
    if (initialData !== null && isUpdate) {
      methods.reset({
        ...initialData,
        dateOfBirth: parse(initialData.dateOfBirth, 'MM/dd/yyyy', new Date())
      })
    }
  }, [initialData, methods, isUpdate])

  return <FormProvider {...methods}>{isUpdate && <Profile handleCancel={handleCancel} />}</FormProvider>
}

ProfileProvider.propTypes = {
  handleCancel: PropTypes.func,
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool
}
