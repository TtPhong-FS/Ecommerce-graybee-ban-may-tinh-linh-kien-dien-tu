import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../../cards/ProductCard'
import { Loading } from '../../Loading'
import '../styles/swiper.css'

const CarouselWrapper = ({ category }) => {
  const carousels = useSelector((state) => state.carousel.carousels[category])

  if (!carousels || carousels.length === 0) return <Loading />

  return (
    <div className="box">
      <h1>{category?.toUpperCase()} bán chạy</h1>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={5}
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

export default React.memo(CarouselWrapper)
