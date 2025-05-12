export const handleAsyncSubmit = async ({
  asyncAction,
  values,
  onSuccess,
  reset,
  toast,
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
    if (error && typeof error === 'object') {
      Object.entries(error).forEach(([field, message]) => {
        if (field !== 'general' && field !== 'unconnect') {
          setError?.(field, { type: 'server', message })
        }
      })
      if (error.general) return toast?.error(error.general)
      if (error.unconnect) return toast?.warning(error.unconnect)
      else if (error.detail) toast?.error(error.detail)
    }
  } finally {
    if (loadingKey && stopLoading) stopLoading(loadingKey)
  }
}
