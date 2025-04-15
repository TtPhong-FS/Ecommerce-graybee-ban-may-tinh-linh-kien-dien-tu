import { CarouselWrapper } from '../components/carousels/components/CarouselWrapper'
import Sidebar from '../components/sidebar/Sidebar'

export const HomePage = () => {
  return (
    <div>
      <Sidebar />
      <CarouselWrapper category={'laptop'} type={'best_seller'} />
    </div>
  )
}
