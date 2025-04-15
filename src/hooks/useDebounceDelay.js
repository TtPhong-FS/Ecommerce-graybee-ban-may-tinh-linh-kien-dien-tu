import { debounce } from 'lodash'
import { useEffect, useState } from 'react'

export const useDebouncedValue = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = debounce(() => setDebouncedValue(value), delay)
    handler()
    return () => handler.cancel()
  }, [value, delay])

  return debouncedValue
}
