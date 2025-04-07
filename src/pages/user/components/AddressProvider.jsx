import { yupResolver } from '@hookform/resolvers/yup'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { defaultValues, Schema } from '../types/address'
import { Address } from './Address'

export const AddressProvider = ({ isUpdate, initialData, onClose }) => {
  const [loading, setLoading] = useState(true)
  const methods = useForm({ resolver: yupResolver(Schema), defaultValues, mode: 'all', shouldUnregister: false })

  useEffect(() => {
    if (initialData) {
      methods.reset({
        ...initialData
      })
    } else {
      methods.reset(defaultValues)
    }
    setLoading(false)
  }, [initialData, methods])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <FormProvider {...methods}>
      <Address isUpdate={isUpdate} onClose={onClose} />
    </FormProvider>
  )
}
AddressProvider.propTypes = {
  initialData: PropTypes.object,
  isUpdate: PropTypes.bool,
  onClose: PropTypes.func
}
