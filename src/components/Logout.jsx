import { AuthContext } from '@/features/auth'
import { useContext, useEffect } from 'react'

export default function Logout() {
  const { handleLogout } = useContext(AuthContext)

  useEffect(() => {
    handleLogout()
  }, [handleLogout])
}
