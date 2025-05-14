import { unFocusSidebar } from '@/components/sidebar/features/slice'
import useAppContext from '@/hooks/useAppContext'
import { useEffect } from 'react'
import CarouselWrapper from '../components/carousels/components/CarouselWrapper'
import Sidebar from '../components/sidebar/Sidebar'

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
      <div className="flex flex-col gap-4 mt-10">
        <CarouselWrapper category={'laptop'} />
        <CarouselWrapper category={'pc'} />
        <CarouselWrapper category={'cpu'} />
      </div>
    </div>
  )
}
