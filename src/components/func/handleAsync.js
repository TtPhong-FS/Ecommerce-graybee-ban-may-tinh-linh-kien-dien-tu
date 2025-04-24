export const handleAsync = async ({ asyncAction, values, onSuccess, openNotificationWithIcon }) => {
  debugger
  try {
    const res = await asyncAction(values)
    if (res.status === 200) {
      onSuccess?.(res)
    }
  } catch (error) {
    if (error && typeof error === 'object') {
      if (error.general) openNotificationWithIcon?.('error', 'Thất bại', error.general)
      else if (error.unconnect) openNotificationWithIcon?.('warning', 'Lỗi kết nối', error.unconnect)
      else openNotificationWithIcon?.('error', error.title, error.detail)
    }
  }
}
