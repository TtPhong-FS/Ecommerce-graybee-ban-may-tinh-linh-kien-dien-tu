import { useCallback, useState } from 'react'

export default function useLoading() {
  const [loading, setLoading] = useState({})

  const setLoad = useCallback((key, value) => {
    setLoading((prev) => ({
      ...prev,
      [key]: value
    }))
  }, [])

  const start = (key) => setLoad(key, true)
  const stop = (key) => setLoad(key, false)

  const isLoading = (key) => !!loading[key]

  return { isLoading, start, stop }
}
