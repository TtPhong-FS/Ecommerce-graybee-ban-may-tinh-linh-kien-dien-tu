import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop = React.memo(() => {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
})

ScrollToTop.displayName = 'ScrollToTop'
