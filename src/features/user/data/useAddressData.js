import { useSelector } from 'react-redux'

export  function useAddressData() {
  const { deliveryAddress } = useSelector((state) => state.account)
  return {
    deliveryAddress
  }
}
