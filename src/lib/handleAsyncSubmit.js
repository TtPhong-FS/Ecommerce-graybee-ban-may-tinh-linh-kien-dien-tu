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
    if (error?.status === 400) {
      toast.error('Yêu cầu không hợp lệ')
      return
    }

    if (error?.status === 500) {
      toast.error('Hệ thống đang gặp sự cố. Vui lòng thử lại sau')
      return
    }

    if (error && typeof error === 'object') {
      const excludedKeys = ['unconnect', 'request', 'global', 'detail']
      Object.entries(error).forEach(([field, message]) => {
        if (!excludedKeys.includes(field)) {
          setError(field, { type: 'server', message })
        }
      })

      if (error.unconnect) return toast.warning(error.unconnect)
      if (error.service_bussy) return toast.warning(error.service_bussy)
      if (error.global) return toast.error(error.global)
      if (error.detail) return toast.error(error.detail)
    } else {
      toast.error('Đã xảy ra lỗi không xác định. Vui lòng thử lại sau.')
    }
  } finally {
    if (loadingKey && stopLoading) stopLoading(loadingKey)
  }
}
