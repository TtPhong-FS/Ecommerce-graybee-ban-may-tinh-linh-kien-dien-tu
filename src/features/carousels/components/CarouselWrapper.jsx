import { ProductCard } from '@/components/cards'
import { Skeleton } from '@/components/ui/skeleton'
import { getProductByCategory } from '@/features/product'
import { handleAsync } from '@/lib'
import { useMediaQuery } from '@mui/material'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import '../styles/swiper.css'

export const CarouselWrapper = ({ category }) => {
  const isMobile = useMediaQuery('(max-width: 640px)')

  const products = useSelector((state) => state.product.products[category])
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetch = async () => {
      await handleAsync({
        asyncAction: () => dispatch(getProductByCategory(category)).unwrap(),
        onSuccess: (res) => {
          setLoading(false)
        }
      })
    }
    fetch()
  }, [category, dispatch])

  return loading || products?.length === 0 ? (
    <Skeleton className="h-[125px] w-full rounded-xl bg-white" />
  ) : (
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
