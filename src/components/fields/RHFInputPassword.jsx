import { Eye, EyeOff } from 'lucide-react'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '../custom/ErrorMessage'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export function RHFInputPassword({ name, label, isRequired, placeholder, disabled }) {
  const { control } = useFormContext()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className=" flex flex-col">
          <Label className="title-form" htmlFor={name}>
            {label} {isRequired && '*'}
          </Label>
          <div className="relative">
            <Input
              value={field.value ?? null}
              onChange={(value) => field.onChange(value)}
              disabled={disabled}
              className={`h-[40px] max-sm:text-sm ${
                error && 'border-error focus-visible:border-error focus-visible:ring-error/20 focus-visible:ring-[3px]'
              }`}
              type={showPassword ? 'text' : 'password'}
              placeholder={placeholder}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <ErrorMessage error={error} />
        </div>
      )}
    />
  )
}

RHFInputPassword.propTypes = {
  name: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string
}
