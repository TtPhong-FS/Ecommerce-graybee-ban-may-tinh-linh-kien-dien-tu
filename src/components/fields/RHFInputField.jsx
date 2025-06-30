import PropTypes from 'prop-types'

import { Controller, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '../custom/ErrorMessage'
import { Input } from '../ui/input'

export function RHFInputField({ name, label, type, isRequired, placeholder, disabled }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className=" flex flex-col">
          <div className="title-form">
            <label>{label}</label>
            {isRequired && <sup>*</sup>}
          </div>
          <div className="relative">
            <Input
              value={field.value ?? null}
              onChange={(value) => field.onChange(value)}
              disabled={disabled}
              className={`h-[40px] max-sm:text-sm ${
                error && 'border-error focus-visible:border-error focus-visible:ring-error/20 focus-visible:ring-[3px]'
              }`}
              type={type}
              placeholder={placeholder}
            />
          </div>
          <ErrorMessage error={error} />
        </div>
      )}
    />
  )
}

RHFInputField.propTypes = {
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}
