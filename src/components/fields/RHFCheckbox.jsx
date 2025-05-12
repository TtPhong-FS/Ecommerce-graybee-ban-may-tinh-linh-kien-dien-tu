import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'

export function RHFCheckBox({ name }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox className="w-4 h-4 cursor-pointer" checked={field.value || false} onCheckedChange={field.onChange} />
      )}
    />
  )
}

RHFCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}
