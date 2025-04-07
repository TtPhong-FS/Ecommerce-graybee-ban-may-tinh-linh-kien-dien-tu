import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { IconButton } from '@mui/material'
import { Button } from 'antd'

import { useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Loading } from '../../../components/Loading'
import { isPresentInFavorites } from '../../../utils'
import { useActionAddToCartAndFavourite, useToDetail } from '../../product/hooks'
export const MouseCarousel = () => {
  const mouses = useSelector((state) => state.carousel.mouses)

  const favourites = useSelector((state) => state.account.favourites)

  const { contextHolder, handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()

  const toDetail = useToDetail()

  if (!mouses || mouses.length === 0) {
    return <Loading />
  }

  return (
    <div className="box">
      <h2 className="title mb-4">Mouse bán chạy</h2>
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
        {mouses?.map((mouse, index) => (
          <SwiperSlide key={mouse.id}>
            <div className="carousel-container" key={index}>
              <div className="carousel-box">
                <div onClick={() => toDetail({ id: mouse.id, name: mouse.name })} className="carousel-container-img">
                  <img width="100%" height={180} src={mouse.thumbnail} alt={mouse.name} />
                </div>
                <div className="carousel-container-info">
                  <div onClick={() => toDetail({ id: mouse.id, name: mouse.name })} className="cursor-pointer h-[5rem]">
                    <p className="carousel-content-text max-sm:text-[12.8px] line-clamp-3">{mouse.name}</p>
                  </div>
                  <div className="h-[1.5rem]">
                    <del className="font-medium text-sm text-gray-500 max-sm:text-[11px]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(mouse.price)}
                    </del>
                    <span className="font-medium text-lg font-sans ml-1 text-red-500 max-sm:text-[12px]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(mouse.finalPrice)}
                    </span>
                  </div>
                </div>
                <div className="carousel-container-button sm:mt-4">
                  <IconButton onClick={() => handleAddToFavourites(mouse.id)}>
                    {isPresentInFavorites(favourites, mouse.id) ? (
                      <HeartFilled style={{ fontSize: '1.8rem', color: '#fb2c36' }} />
                    ) : (
                      <HeartOutlined style={{ fontSize: '1.8rem' }} />
                    )}
                  </IconButton>
                  <Button
                    icon={<ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />}
                    style={{ width: '50%', height: '2.5rem' }}
                    onClick={() => handleAddItemToCart(mouse.id, 1)}
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
