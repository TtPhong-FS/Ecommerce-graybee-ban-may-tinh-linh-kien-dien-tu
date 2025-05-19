import { useSelector } from 'react-redux'

export function useOrderData() {
  const { orders, loading } = useSelector((state) => state.account)
  return {
    orders,
    loading
  }
}
