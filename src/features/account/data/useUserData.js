import { useSelector } from 'react-redux'

export function useUserData() {
  const { loading, user, favourites } = useSelector((state) => state.account)
  return {
    loading,
    user,
    favourites
  }
}
