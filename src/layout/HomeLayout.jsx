import Sidebar from '../components/sidebar/Sidebar'
import { CarouselPage } from '../pages/carousels/pages'

export const HomeLayout = () => {
  return (
    <div>
      <Sidebar />
      <CarouselPage />
    </div>
  )
}
