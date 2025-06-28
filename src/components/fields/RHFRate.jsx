import { Rate } from 'antd'
import PropTypes from 'prop-types'
import { Controller, useFormContext } from 'react-hook-form'
import { Label } from '../ui/label'

export default function RHFRate({ name, label }) {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <Label className="title-form">{label}</Label>
          <Rate defaultValue={0} {...field} />
        </div>
      )}
    />
  )
}

RHFRate.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string
}
