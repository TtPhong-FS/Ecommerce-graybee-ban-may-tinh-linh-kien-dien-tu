import { ProductCard } from '@/components/cards'
import { selectProducts } from '@/features/product/redux/productSelector'
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
  const isMobile = useMediaQuery('(max-width: 640px)')

  const products = useSelector(selectProducts)

  return (
    <div className="card">
      <h1 className="mb-6">{category?.toUpperCase()} bán chạy</h1>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={isMobile ? 3 : 6}
        spaceBetween={10}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        className="relative"
      >
        {products?.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
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
