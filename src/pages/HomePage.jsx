import CarouselWrapper from '../components/carousels/components/CarouselWrapper'
import Sidebar from '../components/sidebar/Sidebar'

export const HomePage = () => {
  return (
    <div>
      <Sidebar />
      <div className="flex flex-col gap-4">
        <CarouselWrapper category={'laptop'} />
        <CarouselWrapper category={'pc'} />
        <CarouselWrapper category={'cpu'} />
      </div>
    </div>
  )
}
