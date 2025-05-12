import PropTypes from 'prop-types'

import React from 'react'
import { useSelector } from 'react-redux'

import { Heart, ShoppingCart } from 'lucide-react'
import { useActionAddToCartAndFavourite, useToDetail } from '../../hooks'

import { isPresentInFavorites } from '../../utils'
import { formattedPrice } from '../../utils/format'
import { isPresentInCart } from '../../utils/isPresentInCart'
import '../carousels/styles/swiper.css'
const ProductCard = ({ data }) => {
  const favourites = useSelector((state) => state.account.favourites)
  const cartItems = useSelector((state) => state.cart.cartItems)

  const { handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()

  const toDetail = useToDetail()

  return (
    <div className="carousel-container">
      <div className="carousel-box">
        <div onClick={() => toDetail({ id: data?.id, name: data?.name })} className="carousel-container-img">
          <img className="w-[150px] h-[150px] place-self-center" src={data?.thumbnail} alt={data?.name} />
        </div>
        <div className="flex flex-col gap-4">
          <div onClick={() => toDetail({ id: data?.id, name: data?.name })} className="cursor-pointer">
            <span className="font-medium hover:underline decoration-solid text-blue-600 max-sm:text-[12.8px] line-clamp-2">
              {data?.name}
            </span>
          </div>
          <div className="flex flex-col justify-center h-[1.5rem]">
            <del className="font-medium text-[13px] max-sm:text-[11px] text-gray-500">
              {formattedPrice(data?.price)}
            </del>
            <span className="font-medium text-[16px] font-sans text-red-500 max-sm:text-[14px]">
              {formattedPrice(data?.finalPrice)}
            </span>
          </div>
        </div>
        <div className="carousel-container-button sm:mt-4">
          <span
            className="hover:bg-muted p-2 rounded-full cursor-pointer"
            onClick={() => handleAddToFavourites(data?.id)}
          >
            {isPresentInFavorites(favourites, data?.id) ? (
              <Heart size={20} className="text-red-500" />
            ) : (
              <Heart size={20} className="text-gray-600" />
            )}
          </span>
          <span
            className="hover:bg-muted p-2 rounded-full cursor-pointer"
            onClick={() => handleAddItemToCart(data?.id, 1)}
          >
            {isPresentInCart(cartItems, data?.id) ? (
              <ShoppingCart size={20} className="text-blue-600" />
            ) : (
              <ShoppingCart size={20} className="text-gray-600" />
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  data: PropTypes.object
}

export default React.memo(ProductCard)
