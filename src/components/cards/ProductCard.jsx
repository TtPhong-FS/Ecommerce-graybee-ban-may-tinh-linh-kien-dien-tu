import PropTypes from 'prop-types'

import { Heart, LoaderCircle, ShoppingCart } from 'lucide-react'

import { useActionAddToCartAndFavourite } from '@/features/product'
import { useLoading } from '@/hooks'
import { formattedPrice, isPresentInFavorites } from '@/utils'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../features/carousels/styles/swiper.css'
import { Button } from '../ui/button'
export const ProductCard = ({ product }) => {
  const { isLoading, start, stop } = useLoading()

  const favorites = useSelector((state) => state.account.favourites) || []

  const { handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite(start, stop)

  return (
    <div className="border rounded-md px-3 py-1 flex flex-col h-full">
      <div className="pb-4 flex flex-col h-full">
        <Link to={`/products/${product?.slug}`}>
          <img
            className="bg-white p-2 w-[150px] h-[150px] place-self-center"
            src={product?.thumbnail}
            alt={product?.slug}
          />
        </Link>

        <div className="flex flex-col gap-2 mt-4 flex-1">
          <div className="cursor-pointer min-h-[3rem]">
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

        <div className="mt-4 flex md:flex-col max-md:gap-2 md:gap-4">
          <div className="w-full">
            <Button
              disabled={isLoading(`addFavorite:${product?.id}`)}
              onClick={() => handleAddToFavourites(product?.id)}
              variant="outline"
              className="py-5 cursor-pointer w-full"
            >
              {isPresentInFavorites(favorites, product?.id) ? (
                <>
                  <Heart className="text-red-500" />
                  <span className="hidden md:block">Đã yêu thích</span>
                </>
              ) : (
                <>
                  <Heart />
                  <span className="hidden md:block">Yêu thích</span>
                </>
              )}
            </Button>
          </div>
          <div className="">
            <Button
              disabled={isLoading(`addItemToCart:${product?.id}`)}
              onClick={() => handleAddItemToCart(product?.id)}
              variant="secondary"
              className="py-5 cursor-pointer w-full"
            >
              {isLoading(`addItemToCart:${product?.id}`) ? <LoaderCircle className="animate-spin" /> : <ShoppingCart />}
              <span className="hidden md:block">Thêm vào giỏ</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object
}
