import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

export function RHFCheckBox({ name, label }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex gap-2">
          <Checkbox
            className="w-4 h-4 cursor-pointer"
            checked={field.value || false}
            onCheckedChange={field.onChange}
          />
          <Label className="font-normal">{label}</Label>
        </div>
      )}
    />
  )
}

RHFCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string
}
