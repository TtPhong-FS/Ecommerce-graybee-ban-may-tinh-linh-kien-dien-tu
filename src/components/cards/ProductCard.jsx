import PropTypes from 'prop-types'

import { Heart, ShoppingCart } from 'lucide-react'

import { useActionAddToCartAndFavourite } from '@/features/product'
import { formattedPrice } from '@/utils'
import { Link } from 'react-router-dom'
import '../../features/carousels/styles/swiper.css'
import { Button } from '../ui/button'
export const ProductCard = ({ data }) => {
  const { handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()

  return (
    <div className="carousel-container">
      <div className="carousel-box">
        <div className="carousel-container-img">
          <Link to={`/products/${data?.slug}`}>
            <img className="w-[150px] h-[150px] place-self-center" src={data?.thumbnail} alt={data?.name} />
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <div className="cursor-pointer">
            <Link
              to={`/products/${data?.slug}`}
              className="font-medium hover:underline decoration-solid text-blue-600 text-xs md:text-sm line-clamp-2"
            >
              {data?.name}
            </Link>
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
          <Button onClick={() => handleAddToFavourites(data?.id)} variant="outline" className="py-5 cursor-pointer">
            <Heart /> Yêu thích
          </Button>
          <Button onClick={() => handleAddItemToCart(data?.id)} variant="secondary" className="py-5 cursor-pointer">
            <ShoppingCart />
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  data: PropTypes.object
}
