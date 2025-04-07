import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { IconButton } from '@mui/material'
import { Button } from 'antd'
import { useSelector } from 'react-redux'

import { getToken, isPresentInFavorites } from '../../../utils'

import { Navigate } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Loading } from '../../../components/Loading'
import { useActionAddToCartAndFavourite, useToDetail } from '../../product/hooks'

export const CpuCarousel = () => {
  const cpus = useSelector((state) => state.carousel.cpus)

  const { isLogin } = useSelector((state) => state.auth)
  const token = getToken()
  const favourites = useSelector((state) => state.account.favourites)

  const { contextHolder, handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()

  const handleCheckTokenBeforeAddToFavaourite = (id) => {
    if (isLogin && token) {
      return handleAddToFavourites(id)
    } else {
      return <Navigate to="/login" replace />
    }
  }

  const toDetail = useToDetail()
  if (!cpus || cpus.length === 0) {
    return <Loading />
  }

  return (
    <div className="box">
      <h2 className="title mb-4">CPU bán chạy</h2>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        slidesPerView={5}
        spaceBetween={10}
        navigation
        autoplay={{ delay: 3000 }}
        loop={true}
        className="relative"
      >
        {contextHolder}
        {cpus?.map((cpu, index) => (
          <SwiperSlide key={cpu.id}>
            <div className="carousel-container" key={index}>
              <div className="carousel-box">
                <div onClick={() => toDetail({ id: cpu.id, name: cpu.name })} className="carousel-container-img">
                  <img width="100%" height={180} src={cpu.thumbnail} alt={cpu.name} />
                </div>
                <div className="carousel-container-info">
                  <div onClick={() => toDetail({ id: cpu.id, name: cpu.name })} className="cursor-pointer h-[5rem]">
                    <p className="carousel-content-text max-sm:text-[12.8px] line-clamp-3">{cpu.name}</p>
                  </div>
                  <div className="h-[1.5rem]">
                    <del className="font-medium text-sm text-gray-500 max-sm:text-[11px]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cpu.price)}
                    </del>
                    <span className="font-medium text-lg font-sans ml-1 text-red-500 max-sm:text-[12px]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(cpu.finalPrice)}
                    </span>
                  </div>
                </div>
                <div className="carousel-container-button sm:mt-4">
                  <IconButton onClick={() => handleCheckTokenBeforeAddToFavaourite(cpu.id)}>
                    {isPresentInFavorites(favourites, cpu.id) ? (
                      <HeartFilled style={{ fontSize: '1.8rem', color: '#fb2c36' }} />
                    ) : (
                      <HeartOutlined style={{ fontSize: '1.8rem' }} />
                    )}
                  </IconButton>
                  <Button
                    icon={<ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />}
                    style={{ width: '50%', height: '2.5rem' }}
                    onClick={() => handleAddItemToCart(cpu.id, 1)}
                    type="primary"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
