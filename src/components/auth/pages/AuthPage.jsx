import PropTypes from 'prop-types'

export const AuthPage = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-[28rem] bg-primary-foreground p-6 rounded-md">{children}</div>
    </div>
  )
}

AuthPage.propTypes = {
  children: PropTypes.node
}
