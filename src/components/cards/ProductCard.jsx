import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { IconButton } from '@mui/material'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import React from 'react'
import { useSelector } from 'react-redux'

import { useToDetail } from '../../hooks'
import { useActionAddToCartAndFavourite } from '../../hooks/useActionAddToCartAndFavourite'
import { isPresentInFavorites } from '../../utils'
import '../carousels/styles/swiper.css'
const ProductCard = ({ data }) => {
  console.log('render')
  const favourites = useSelector((state) => state.account.favourites)

  const { contextHolder, handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()

  const toDetail = useToDetail()

  return (
    <div className="carousel-container">
      {contextHolder}
      <div className="carousel-box">
        <div onClick={() => toDetail({ id: data?.id, name: data?.name })} className="carousel-container-img">
          <img width="100%" height={180} src={data?.thumbnail} alt={data?.name} />
        </div>
        <div className="carousel-container-info">
          <div onClick={() => toDetail({ id: data?.id, name: data?.name })} className="cursor-pointer h-[5rem]">
            <p className="carousel-content-text max-sm:text-[12.8px] line-clamp-3">{data?.name}</p>
          </div>
          <div className="flex justify-between items-center h-[1.5rem]">
            <del className="font-medium text-sm text-gray-500 max-sm:text-[11px]">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data?.price)}
            </del>
            <span className="font-medium text-lg font-sans ml-1 text-red-500 max-sm:text-[12px]">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data?.finalPrice)}
            </span>
          </div>
        </div>
        <div className="carousel-container-button sm:mt-4">
          <IconButton onClick={() => handleAddToFavourites(data?.id)}>
            {isPresentInFavorites(favourites, data?.id) ? (
              <HeartFilled style={{ fontSize: '1.8rem', color: '#fb2c36' }} />
            ) : (
              <HeartOutlined style={{ fontSize: '1.8rem' }} />
            )}
          </IconButton>
          <Button
            icon={<ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />}
            style={{ width: '50%', height: '2.5rem' }}
            onClick={() => handleAddItemToCart(data?.id, 1)}
            type="primary"
          />
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  data: PropTypes.object
}

export default React.memo(ProductCard)
