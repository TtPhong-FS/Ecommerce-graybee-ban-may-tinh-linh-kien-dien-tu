import { FormControl } from '@mui/material'
import PropTypes from 'prop-types'

import { CircleAlert } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '../ui/input'
import React from 'react'

const RHFInputField = ({ name, label, type, placeholder, disabled }) => {
  const {control} = useFormContext()
  console.log('render', name)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className=" flex flex-col">
          <label className="title-form">{label}</label>
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
        </div>
      )}
    />
  )
}

RHFInputField.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}
export default React.memo(RHFInputField)
