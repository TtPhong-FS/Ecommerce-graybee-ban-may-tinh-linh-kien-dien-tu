import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { toast } from 'sonner'
import { fetchAllOrderHistoryAsync } from '../redux'

export default function useOrder(start, stop) {
  const { dispatch } = useAppContext()

  const handleReload = async () => {
    await handleAsync({
      asyncAction: () => dispatch(fetchAllOrderHistoryAsync()).unwrap(),
      onSuccess: (res) => {
        toast.success(res.message)
      },
      toast,
      loadingKey: 'reload',
      startLoading: start,
      stopLoading: stop
    })
  }

  return {
    handleReload
  }
}
