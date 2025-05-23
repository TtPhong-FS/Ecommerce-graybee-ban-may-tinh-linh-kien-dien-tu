import PropTypes from 'prop-types'

import { useSelector } from 'react-redux'

import { Heart, ShoppingCart } from 'lucide-react'

import { useActionAddToCartAndFavourite } from '@/features/product'
import { useToDetail } from '@/hooks'
import { formattedPrice, isPresentInCart, isPresentInFavorites } from '@/utils'
import '../../features/carousels/styles/swiper.css'
export const ProductCard = ({ data }) => {
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
            <span className="font-medium hover:underline decoration-solid text-blue-600 text-xs md:text-sm line-clamp-2">
              {data?.name}
            </span>
          </div>
          <div className="flex flex-col justify-center h-[1.5rem]">
            <del className="font-medium md:text-[0.8rem] text-[0.65rem] text-gray-500">
              {formattedPrice(data?.price)}
            </del>
            <span className="font-medium text-sx md:text-sm font-sans text-red-500">
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
