import PropTypes from 'prop-types'

import { Controller } from 'react-hook-form'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export function RHFTextArea({ control, name, label, placeholder }) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex flex-col">
          <Label className="mb-2" htmlFor="textarea">
            {label}
          </Label>
          <Textarea id="textarea" {...field} placeholder={placeholder} className="resize-none" />
        </div>
      )}
    />
  )
}

RHFTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  control: PropTypes.object
}
