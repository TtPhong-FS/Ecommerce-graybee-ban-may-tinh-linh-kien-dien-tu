import { useSelector } from 'react-redux'

export default function useAddressData() {
  const { deliveryAddress, loading } = useSelector((state) => state.account)
  return {
    deliveryAddress,
    loading
  }
}
