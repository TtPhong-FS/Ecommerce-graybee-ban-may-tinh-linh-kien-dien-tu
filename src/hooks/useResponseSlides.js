import { useEffect, useState } from 'react'

export function useResponsiveSlides() {
  const [slides, setSlides] = useState(5)

  useEffect(() => {
    const updateSlides = () => {
      console.log('updateSlides')
      const width = window.innerWidth
      let newSlides = 5

      if (width <= 640) newSlides = 2
      else if (width <= 876) newSlides = 3
      else if (width <= 1024) newSlides = 4

      setSlides((prev) => (prev !== newSlides ? newSlides : prev))
    }

    updateSlides()

    window.addEventListener('resize', updateSlides)
    return () => window.removeEventListener('resize', updateSlides)
  }, [])

  return slides
}
