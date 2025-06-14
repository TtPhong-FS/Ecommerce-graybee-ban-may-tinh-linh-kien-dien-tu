import PropTypes from 'prop-types'

import { CircleAlert } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

export function RHFRadioGroup({ control, name, options, label }) {
  console.log('render')

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
                <RadioGroupItem value={item.value} />
                <Label className="font-normal">{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
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

RHFRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object,
  options: PropTypes.array,
  label: PropTypes.string
}
