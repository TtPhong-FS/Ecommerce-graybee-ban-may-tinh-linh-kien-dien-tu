export const handleAsync = async ({ asyncAction, values, toast, onSuccess, loadingKey, startLoading, stopLoading }) => {
  if (loadingKey && startLoading) startLoading(loadingKey)
  try {
    const res = await asyncAction(values)
    onSuccess?.(res)
  } catch (error) {
    if (error.status === 400) {
      toast.error('Yêu cầu không hợp lệ')
    }
    if (error.status === 500) {
      toast.error('Hệ thống đang gặp sự cố. Vui lòng thử lại sau')
    }
    if (error && typeof error === 'object') {
      if (error?.unconnect) {
        toast?.warning(error.unconnect)
        return
      }

      if (error?.global) return toast?.error(error.global)
      if (error?.detail) {
        toast?.error(error.detail)
        return
      }
    }
  } finally {
    if (loadingKey && stopLoading) stopLoading(loadingKey)
  }
}
