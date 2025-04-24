import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { IconButton } from '@mui/material'
import PropTypes from 'prop-types'

import React from 'react'
import { useSelector } from 'react-redux'

import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import { useNotification, useToDetail } from '../../hooks'
import { useActionAddToCartAndFavourite } from '../../hooks/useActionAddToCartAndFavourite'
import { isPresentInFavorites } from '../../utils'
import { formattedPrice } from '../../utils/format'
import { isPresentInCart } from '../../utils/isPresentInCart'
import '../carousels/styles/swiper.css'
const ProductCard = ({ data }) => {
  const favourites = useSelector((state) => state.account.favourites)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const { contextHolder, openNotificationWithIcon } = useNotification()
  const { handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite(openNotificationWithIcon)

  const toDetail = useToDetail()

  return (
    <div className="carousel-container">
      {contextHolder}
      <div className="carousel-box">
        <div onClick={() => toDetail({ id: data?.id, name: data?.name })} className="carousel-container-img">
          <img className="w-[150px] h-[150px] place-self-center" src={data?.thumbnail} alt={data?.name} />
        </div>
        <div className="carousel-container-info">
          <div onClick={() => toDetail({ id: data?.id, name: data?.name })} className="cursor-pointer h-[5rem]">
            <span className="carousel-content-text hover:underline decoration-solid text-blue-600 max-sm:text-[12.8px] line-clamp-3">
              {data?.name}
            </span>
          </div>
          <div className="flex justify-between items-center h-[1.5rem]">
            <del className="font-medium text-sm text-gray-500 max-sm:text-[11px]">{formattedPrice(data?.price)}</del>
            <span className="font-medium text-lg font-sans ml-1 text-red-500 max-sm:text-[12px]">
              {formattedPrice(data?.finalPrice)}
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
          <IconButton
            sx={{
              ':hover': {
                color: 'white'
              }
            }}
            onClick={() => handleAddItemToCart(data?.id, 1)}
          >
            {isPresentInCart(cartItems, data?.id) ? (
              <ShoppingCartRoundedIcon
                sx={{
                  color: '#155dfc'
                }}
              />
            ) : (
              <AddShoppingCartOutlinedIcon
                sx={{
                  color: 'black'
                }}
              />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  data: PropTypes.object
}

export default React.memo(ProductCard)
