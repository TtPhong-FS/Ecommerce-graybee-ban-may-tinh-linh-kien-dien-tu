import { fetchCarousel } from '@/components/carousels/features/slice'
import { Button } from '@/components/ui/button'
import useAppContext from '@/hooks/useAppContext'
import CarouselWrapper from '../components/carousels/components/CarouselWrapper'
import Sidebar from '../components/sidebar/Sidebar'

export const HomePage = () => {
  const { dispatch } = useAppContext()

  const handleFetchCarousel = () => {
    dispatch(fetchCarousel({ category: 'pc' }))
  }

  return (
    <div>
      <Sidebar />
      <div className="flex flex-col gap-4">
        <Button onClick={() => handleFetchCarousel()}></Button>
        <CarouselWrapper category={'laptop'} />
        <CarouselWrapper category={'pc'} />
        <CarouselWrapper category={'cpu'} />
      </div>
    </div>
  )
}
