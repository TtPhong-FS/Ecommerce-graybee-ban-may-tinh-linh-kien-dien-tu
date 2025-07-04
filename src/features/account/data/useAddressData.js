import { useSelector } from 'react-redux'

export function useAddressData() {
  const address = useSelector((state) => state.account.address)
  return {
    address
  }
}
