import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { IconButton } from '@mui/material'
import { Button, Image } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { isPresentInFavorites } from '../../../utils'
import { useActionAddToCartAndFavourite } from '../hooks/useActionAddToCartAndFavourite'
const ProductCard = () => {
  const products = useSelector((state) => state.product.products)
  const data = products ? Object.values(products) : []
  const favourites = useSelector((state) => state.account.favourites)

  const { contextHolder, handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()
  return (
    <div className="flex gap-2 bg-white p-4">
      {contextHolder}
      {data?.map((product, index) => (
        <article className="bg-transparent rounded-sm w-full h-auto" key={index}>
          <div className="p-1">
            <div className="mb-3 flex justify-center">
              <Image width="100%" height={180} src={product.thumbnail} alt={product.name} />
            </div>
            <div className="flex flex-col gap-2 h-[7rem]">
              <div className="h-[5rem]">
                <p className="font-semibold text-[#090d14] text-[1rem] max-sm:text-[12.8px]">{product.name}</p>
              </div>
              <div className="h-[1.5rem]">
                <del className="font-medium text-sm text-gray-500 max-sm:text-[11px]">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                </del>
                <span className="font-medium text-lg font-sans ml-1 text-red-500 max-sm:text-[12px]">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.finalPrice)}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 mt-6 sm:mt-8">
              <IconButton onClick={() => handleAddToFavourites(product.id)}>
                {isPresentInFavorites(favourites, product.id) ? (
                  <HeartFilled style={{ fontSize: '1.8rem', color: '#fb2c36' }} />
                ) : (
                  <HeartOutlined style={{ fontSize: '1.8rem' }} />
                )}
              </IconButton>
              <Button
                icon={<ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />}
                style={{ width: '50%', height: '2.5rem' }}
                onClick={() => handleAddItemToCart(product.id, 1)}
                type="primary"
              />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.array
}

export default ProductCard
