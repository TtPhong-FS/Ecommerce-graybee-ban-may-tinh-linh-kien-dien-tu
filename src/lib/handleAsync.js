export const handleAsync = async ({ asyncAction, values, onSuccess, toast, loadingKey, startLoading, stopLoading }) => {
  if (loadingKey && startLoading) startLoading(loadingKey)
  try {
    const res = await asyncAction(values)
    onSuccess?.(res)
  } catch (error) {
    if (error && typeof error === 'object') {
      if (error.general) toast?.error(error.general)
      else if (error.unconnect) toast?.warning(error.unconnect)
      else if (error.detail) toast?.error(error.detail)
    }
  } finally {
    if (loadingKey && stopLoading) stopLoading(loadingKey)
  }
}
