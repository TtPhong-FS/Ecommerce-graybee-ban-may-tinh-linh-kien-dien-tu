import { Loading } from '@/components'
import { ProductCard } from '@/components/cards'
import { useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import '../styles/swiper.css'

export const CarouselWrapper = ({ category }) => {
  const carousels = useSelector((state) => state.carousel.carousels[category])

  const isMobile = useMediaQuery('(max-width: 640px)')

  if (!carousels || carousels.length === 0) return <Loading />

  return (
    <div className="box">
      <h1>{category?.toUpperCase()} bán chạy</h1>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={isMobile ? 3 : 6}
        spaceBetween={10}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        className="relative"
      >
        {carousels?.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

CarouselWrapper.propTypes = {
  category: PropTypes.string,
  type: PropTypes.string
}
