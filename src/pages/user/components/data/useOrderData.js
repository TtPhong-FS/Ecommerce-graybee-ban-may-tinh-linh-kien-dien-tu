import { useSelector } from 'react-redux'

export default function useOrderData() {
  const { orders, loading } = useSelector((state) => state.account)
  return {
    orders,
    loading
  }
}
