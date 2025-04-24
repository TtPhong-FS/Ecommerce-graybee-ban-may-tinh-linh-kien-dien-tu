export const handleAsyncSubmit = async ({
  asyncAction,
  values,
  onSuccess,
  setError,
  openNotificationWithIcon,
  reset,
  defaultValues
}) => {
  debugger
  try {
    const res = await asyncAction(values)
    if (res.status === 201) {
      onSuccess?.(res)
      reset?.(defaultValues)
    }
  } catch (error) {
    if (error && typeof error === 'object') {
      Object.entries(error).forEach(([field, message]) => {
        if (field !== 'general' && field !== 'unconnect') {
          setError?.(field, { type: 'server', message })
        }
      })
      if (error.general) openNotificationWithIcon?.('error', 'Thất bại', error.general)
      else if (error.unconnect) openNotificationWithIcon?.('warning', 'Lỗi kết nối', error.unconnect)
      else openNotificationWithIcon?.('error', error.title, error.detail)
    }
  }
}
