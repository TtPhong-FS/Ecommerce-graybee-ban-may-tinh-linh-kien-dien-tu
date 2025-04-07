import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { IconButton } from '@mui/material'
import { Button } from 'antd'
import { useSelector } from 'react-redux'

import { isPresentInFavorites } from '../../../utils'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Loading } from '../../../components/Loading'
import { useActionAddToCartAndFavourite, useToDetail } from '../../product/hooks'

export const LaptopCarousel = () => {
  const laptops = useSelector((state) => state.carousel.laptops)

  const favourites = useSelector((state) => state.account.favourites)

  const { contextHolder, handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()

  const toDetail = useToDetail()

  if (!laptops || laptops.length === 0) {
    return <Loading />
  }

  return (
    <div className="box">
      <h2 className="title mb-4">Laptop bán chạy</h2>
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
        {laptops?.map((laptop, index) => (
          <SwiperSlide key={laptop.id}>
            <div className="carousel-container" key={index}>
              <div className="carousel-box">
                <div onClick={() => toDetail({ id: laptop.id, name: laptop.name })} className="carousel-container-img">
                  <img width="100%" height={180} src={laptop.thumbnail} alt={laptop.name} />
                </div>
                <div className="carousel-container-info">
                  <div
                    onClick={() => toDetail({ id: laptop.id, name: laptop.name })}
                    className="cursor-pointer h-[5rem]"
                  >
                    <p className="carousel-content-text max-sm:text-[12.8px] line-clamp-3">{laptop.name}</p>
                  </div>
                  <div className="h-[1.5rem]">
                    <del className="font-medium text-sm text-gray-500 max-sm:text-[11px]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laptop.price)}
                    </del>
                    <span className="font-medium text-lg font-sans ml-1 text-red-500 max-sm:text-[12px]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(laptop.finalPrice)}
                    </span>
                  </div>
                </div>
                <div className="carousel-container-button sm:mt-4">
                  <IconButton onClick={() => handleAddToFavourites(laptop.id)}>
                    {isPresentInFavorites(favourites, laptop.id) ? (
                      <HeartFilled style={{ fontSize: '1.8rem', color: '#fb2c36' }} />
                    ) : (
                      <HeartOutlined style={{ fontSize: '1.8rem' }} />
                    )}
                  </IconButton>
                  <Button
                    icon={<ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />}
                    style={{ width: '50%', height: '2.5rem' }}
                    onClick={() => handleAddItemToCart(laptop.id, 1)}
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
