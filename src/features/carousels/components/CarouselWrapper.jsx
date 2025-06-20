import { ProductCard } from '@/components/cards'
import { getProductByCategory } from '@/features/product'
import { useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import '../styles/swiper.css'

export const CarouselWrapper = ({ category }) => {
  const isMobile = useMediaQuery('(max-width: 640px)')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductByCategory(category))
  }, [])

  const products = useSelector((state) => state.product.products[category])

  if (products?.length === 0) {
    return null
  }

  return (
    <div className="card">
      <h1 className="mb-6">{category} bán chạy</h1>
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
