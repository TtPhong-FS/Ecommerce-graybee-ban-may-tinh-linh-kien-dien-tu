export const handleAsync = async ({ asyncAction, values, toast, onSuccess, loadingKey, startLoading, stopLoading }) => {
  if (loadingKey && startLoading) startLoading(loadingKey)
  try {
    const res = await asyncAction(values)
    onSuccess?.(res)
  } catch (error) {
    if (error?.status === 400) {
      toast.error('Yêu cầu không hợp lệ')
      return
    }

    if (error?.status === 500) {
      toast.error('Hệ thống đang gặp sự cố. Vui lòng thử lại sau')
      return
    }

    const message = error?.unconnect || error?.global || error?.detail

    if (message) {
      const type = error?.unconnect ? 'warning' : 'error'
      toast?.[type](message)
    }
  } finally {
    if (loadingKey && stopLoading) stopLoading(loadingKey)
  }
}
