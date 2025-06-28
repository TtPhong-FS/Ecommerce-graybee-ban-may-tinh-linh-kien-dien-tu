import { CircleAlert } from 'lucide-react'
import PropTypes from 'prop-types'

export function ErrorMessage({ error }) {
  return (
    error && (
      <span className="error-message flex gap-1 items-center">
        <CircleAlert size={16} /> {error.message}
      </span>
    )
  )
}
ErrorMessage.propTypes = {
  error: PropTypes.object
}
