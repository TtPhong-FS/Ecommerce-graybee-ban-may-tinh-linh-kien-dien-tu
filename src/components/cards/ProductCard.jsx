import PropTypes from 'prop-types'

import { Heart, ShoppingCart } from 'lucide-react'

import { useActionAddToCartAndFavourite } from '@/features/product'
import { useLoading } from '@/hooks'
import { formattedPrice } from '@/utils'
import { Link } from 'react-router-dom'
import '../../features/carousels/styles/swiper.css'
import { Button } from '../ui/button'
export const ProductCard = ({ product }) => {
  const { isLoading, start, stop } = useLoading()

  const { handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite(start, stop)

  return (
    <div className="border rounded-md px-2 py-3">
      <div className="">
        <Link to={`/products/${product?.slug}`}>
          <img
            className="bg-white p-2 w-[150px] h-[150px] place-self-center"
            src={product?.thumbnail}
            alt={product?.name}
          />
        </Link>
        <div className="flex flex-col gap-2 mt-4">
          <div className="cursor-pointer">
            <Link
              to={`/products/${product?.slug}`}
              className="font-medium hover:underline decoration-solid text-blue-600 text-xs md:text-sm line-clamp-2"
            >
              {product?.name}
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            <del className="font-medium text-muted-foreground text-xs lg:text-sm">{formattedPrice(product?.price)}</del>
            <span className="font-medium text-base lg:text-lg text-red-500">{formattedPrice(product?.finalPrice)}</span>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <Button
            disabled={isLoading(`addFavorite:${product?.id}`)}
            onClick={() => handleAddToFavourites(product?.id)}
            variant="outline"
            className="py-5 cursor-pointer w-full"
          >
            <Heart /> Yêu thích
          </Button>
          <Button
            disabled={isLoading(`addItemToCart:${product?.id}`)}
            onClick={() => handleAddItemToCart(product?.id)}
            variant="secondary"
            className="py-5 cursor-pointer w-full"
          >
            <ShoppingCart />
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object
}
