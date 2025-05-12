import PropTypes from 'prop-types'

import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

export const RHFRadioGroup = ({ name, options, label }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex items-center gap-2">
          <label className="title-form">{label}</label>
          <RadioGroup className="flex gap-2 items-center" onValueChange={field.onChange} defaultValue={field.value}>
            {options?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={item.value} id={index} />
                <Label htmlFor={index}>{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
          {error && <span className="error-message">{error.message}</span>}
        </div>
      )}
    />
  )
}

RHFRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  label: PropTypes.string
}
