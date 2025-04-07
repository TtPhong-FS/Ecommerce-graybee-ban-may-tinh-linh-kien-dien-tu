import { CpuCarousel } from '../components/CpuCarousel'
import { KeyboardCarousel } from '../components/KeyboardCarousel'
import { LaptopCarousel } from '../components/LaptopCarousel'
import { MonitorCarousel } from '../components/MonitorCarousel'
import { MouseCarousel } from '../components/MouseCarousel'
import { PcCarousel } from '../components/PcCarousel'
import '../styles/swiper.css'
export const CarouselPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <LaptopCarousel />
      <PcCarousel />
      <MouseCarousel />
      <CpuCarousel />
      <KeyboardCarousel />
      <MonitorCarousel />
    </div>
  )
}
