import PropTypes from 'prop-types'

import { Controller, useFormContext } from 'react-hook-form'
import { ErrorMessage } from '../custom/ErrorMessage'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

export function RHFRadioGroup({ name, options, label }) {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          <label className="title-form">{label}</label>
          <RadioGroup className="flex gap-2 items-center" onValueChange={field.onChange} value={field.value}>
            {options?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={item.value} />
                <Label className="font-normal">{item.label}</Label>
              </div>
            ))}
          </RadioGroup>
          <ErrorMessage error={error} />
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
