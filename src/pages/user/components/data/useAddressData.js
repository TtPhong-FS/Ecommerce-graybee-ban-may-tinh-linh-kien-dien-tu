import { useSelector } from 'react-redux'

export default function useAddressData() {
  const { deliveryAddress } = useSelector((state) => state.account)
  return {
    deliveryAddress
  }
}
