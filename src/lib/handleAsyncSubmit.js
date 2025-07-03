import { toast } from 'sonner'

export const handleAsyncSubmit = async ({
  asyncAction,
  values,
  onSuccess,
  reset,
  defaultValues,
  setError,
  loadingKey,
  startLoading,
  stopLoading
}) => {
  if (loadingKey && startLoading) startLoading(loadingKey)
  try {
    const res = await asyncAction(values)
    onSuccess?.(res)
    reset?.(defaultValues)
  } catch (error) {
    if (error.status === 400) {
      toast.error('Yêu cầu không hợp lệ')
    }
    if (error.status === 500) {
      toast.error('Hệ thống đang gặp sự cố. Vui lòng thử lại sau')
    }
    console.log(error)
    if (error && typeof error === 'object') {
      Object.entries(error).forEach(([field, message]) => {
        if (field !== 'unconnect' && field !== 'request' && field !== 'global' && field !== 'detail') {
          setError(field, { type: 'server', message })
        }
      })

      if (error?.unconnect) {
        toast?.warning(error.unconnect)
        return
      }

      if (error?.global) return toast?.error(error.global)
      if (error?.detail) {
        toast?.error(error.detail)
        return
      }
    } else {
      toast?.error('Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.')
    }
  } finally {
    if (loadingKey && stopLoading) stopLoading(loadingKey)
  }
}
