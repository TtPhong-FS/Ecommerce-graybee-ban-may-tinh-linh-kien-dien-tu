import { FormControl } from '@mui/material'
import PropTypes from 'prop-types'

import { CircleAlert } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'

export const RHFInputField = ({ name, label, type, placeholder, disabled }) => {
  const { control } = useFormContext()
  console.log('render', name)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl className="select-none" fullWidth error={!!error}>
          <label className="title-form text-sm">{label}</label>
          <Input
            {...field}
            disabled={disabled}
            className={`h-[40px] ${
              error && 'border-error focus-visible:border-error focus-visible:ring-error/20 focus-visible:ring-[3px]'
            }`}
            type={type}
            placeholder={placeholder}
          />
          {error && (
            <span className="error-message flex gap-1 items-center">
              <CircleAlert size={16} /> {error.message}
            </span>
          )}
        </FormControl>
      )}
    />
  )
}

RHFInputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}
