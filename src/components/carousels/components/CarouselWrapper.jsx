import PropTypes from 'prop-types'
import React, { useEffect, useMemo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import ProductCard from '../../cards/ProductCard'
import { Loading } from '../../Loading'
import { getCarouselByCategoryAndType } from '../features/carouselSelector'
import { fetchCarousel } from '../features/slice'
import '../styles/swiper.css'
export const CarouselWrapper = ({ category, type }) => {
  console.log('render')
  const dispatch = useDispatch()
  const selectCarousel = useMemo(() => getCarouselByCategoryAndType(category, type), [category, type])

  const carousel = useSelector(selectCarousel)

  const isFetch = useRef(false)

  useEffect(() => {
    if (!isFetch.current) {
      if (!carousel || carousel.length === 0) {
        dispatch(fetchCarousel({ category, type }))
      }
    }
    isFetch.current = true
  }, [carousel, category, type, dispatch])

  if (!carousel || carousel.length === 0) return <Loading />

  return (
    <div className="box">
      <h2 className="title mb-4">{category?.toUpperCase()} bán chạy</h2>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={5}
        spaceBetween={10}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        className="relative"
      >
        {carousel?.map((product, index) => (
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
