import { ProductCard } from '@/components/cards'
import { Skeleton } from '@/components/ui/skeleton'
import { handleAsync } from '@/lib'
import { slugify } from '@/utils'
import { useMediaQuery } from '@mui/material'
import { Truck } from 'lucide-react'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { fetchCarouselAsync } from '../redux/carouselSlice'
import '../styles/swiper.css'

export const CarouselWrapper = ({ category }) => {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(max-width: 914px)')

  const slugifyCategory = slugify(category)

  const carousels = useSelector((state) => state.carousel.carousels[slugifyCategory])
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)

  let isFetch = useRef(false)

  useEffect(() => {
    if (!isFetch.current && (carousels?.products.length === 0 || carousels === undefined)) {
      setLoading(true)
      const fetch = async () => {
        await handleAsync({
          asyncAction: () => dispatch(fetchCarouselAsync(category)).unwrap(),
          onSuccess: () => {
            setLoading(false)
          }
        })
      }
      fetch()
    }
    isFetch.current = true
  }, [category, dispatch, carousels?.products.length, carousels])

  return loading || carousels?.length === 0 ? (
    <Skeleton className="h-[125px] w-full rounded-xl bg-white" />
  ) : (
    <div className="bg-white p-2 rounded-md">
      <div className="flex items-center mb-6 gap-6">
        <Link to={`/collections/${carousels?.categorySlug}`} className="font-bold text-gray-800 uppercase ml-4">
          {category} bán chạy
        </Link>
        <div className="hidden md:flex items-center gap-2">
          <Truck className="text-red-600" />
          <span className="text-sm max-md:text-xs text-muted-foreground">
            Miễn phí vận chuyển cho đơn hàng từ 500.000đ
          </span>
        </div>
        <Link to={`/collections/${carousels?.categorySlug}`} className="ml-auto link mr-4 max-md:text-sm">
          Xem tất cả
        </Link>
      </div>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={isMobile ? 2 : isTablet ? 3 : 5}
        spaceBetween={10}
        navigation
        autoplay={{ delay: 3500 }}
        loop={true}
        className="relative"
      >
        {carousels?.products?.map((product) => (
          <SwiperSlide key={product.id}>
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
