import PropTypes from 'prop-types'

export const AuthPage = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="max-md:w-full w-[30rem] bg-primary-foreground p-4 rounded-md">{children}</div>
    </div>
  )
}

AuthPage.propTypes = {
  children: PropTypes.node
}
