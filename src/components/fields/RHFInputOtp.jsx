import { CircleAlert } from 'lucide-react'
import PropTypes from 'prop-types'
import { Controller } from 'react-hook-form'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '../ui/input-otp'

export default function RHFInputOtp({ control, name, label }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label htmlFor="">{label}</label>
          <InputOTP maxLength={6} {...field}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
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

RHFInputOtp.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.object
}
