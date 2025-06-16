import { Sidebar } from '@/components'
import { CarouselWrapper } from '@/features/carousels'
import { useAppContext } from '@/hooks'
import { unFocusSidebar } from '@/store/redux/homeSlice'
import { useEffect } from 'react'

export const HomePage = () => {
  const { dispatch } = useAppContext()

  useEffect(() => {
    return () => {
      dispatch(unFocusSidebar())
    }
  }, [])

  return (
    <div>
      <Sidebar />

      <CarouselWrapper category={'laptop'} />
    </div>
  )
}
