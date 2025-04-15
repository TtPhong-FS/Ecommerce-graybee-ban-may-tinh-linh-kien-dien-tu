import { useEffect, useRef, useState } from 'react'

export const useLoadInViews = (options = { threshold: 0.1 }) => {
  const ref = useRef()
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), options)

    const current = ref.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [ref, options])

  return [ref, isIntersecting]
}
