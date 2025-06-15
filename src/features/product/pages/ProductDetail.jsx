import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLoading } from '@/hooks'
import { handleAsync } from '@/lib'
import { formattedPrice } from '@/utils'
import { Grid2 } from '@mui/material'
import { Image, Spin, Tabs } from 'antd'
import { Heart, ShoppingCart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { Description, ReviewComment, Specification } from '../components'
import { useActionAddToCartAndFavourite } from '../hooks'
import { fetchProductDetailByIdAsync } from '../redux'

const items = [
  {
    key: 'specifications',
    label: 'Thông số sản phẩm',
    children: <Specification />
  },
  {
    key: 'description',
    label: 'Mô tả sản phẩm',
    children: <Description />
  },
  {
    key: 'reviews',
    label: 'Đánh giá & Nhận xét',
    children: <ReviewComment />
  }
]

export const ProductDetail = () => {
  const { slug } = useParams()

  const dispatch = useDispatch()

  const [ready, setReady] = useState(false)

  const details = useSelector((state) => state.product.details)

  const { isLoading, start, stop } = useLoading()

  const { handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite(start, stop)

  useEffect(() => {
    const fetch = async () => {
      if (details?.slug !== slug) {
        await handleAsync({
          asyncAction: (slug) => dispatch(fetchProductDetailByIdAsync(slug)).unwrap(),
          onSuccess: (res) => {
            setReady(true)
          },
          values: slug,
          toast: toast
        })
      }
    }
    setReady(true)
    fetch()
  }, [slug, dispatch, details])

  return (
    <>
      <Spin spinning={!ready}>
        <div className="select-text">
          <Grid2 width={'100%'} container>
            <Grid2
              width={'100%'}
              spacing={2}
              container
              size={12}
              sx={{ bgcolor: 'white', padding: '1rem', borderRadius: '0.7rem' }}
            >
              <Grid2 size={5} sx={{ borderRight: '1px solid #d1d5dc', padding: '1rem' }}>
                <div>
                  <div className="flex items-center  mb-6">
                    <Image width={200} height={200} src={details?.thumbnail} alt="" />
                  </div>
                </div>
              </Grid2>
              <Grid2 size={7} sx={{ padding: '1rem' }}>
                <h1>{details?.name}</h1>
                <div className="flex mt-4 mb-4 gap-3 items-center">
                  <span className="font-medium text-[2rem] font-sans text-red-500 max-sm:text-[0.9rem]">
                    {formattedPrice(details?.finalPrice)}
                  </span>
                  <del className="font-medium text-[1.4rem] text-gray-500 max-sm:text-[0.6rem]">
                    {formattedPrice(details?.price)}
                  </del>
                  <span>
                    <Badge variant="destructive">-{details?.discountPercent}%</Badge>
                  </span>
                </div>
                <div className="text-base box">
                  {details?.brandName !== null && details?.brandName !== '' && (
                    <p className="content">Thương hiệu: {details?.brandName}</p>
                  )}
                  <p className="content">Tình trạng: {details?.conditions === 'NEW' ? 'Mới' : 'Cũ'}</p>
                  <p className="content">Bảo hàng: {details?.warranty} tháng</p>
                </div>
                <div className="flex gap-10 justify-center items-center mt-10">
                  <div>
                    <Button
                      disabled={isLoading(`addFavorite:${details?.productId}`)}
                      onClick={() => handleAddToFavourites(details?.productId)}
                      variant="outline"
                      className="py-5 cursor-pointer "
                    >
                      <Heart /> Yêu thích
                    </Button>
                  </div>
                  <div>
                    <Button
                      disabled={isLoading(`addItemToCart:${details?.productId}`)}
                      onClick={() => handleAddItemToCart(details?.productId)}
                      variant="secondary"
                      className="py-5 cursor-pointer"
                    >
                      <ShoppingCart />
                      Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              </Grid2>
            </Grid2>
            <Grid2 size={7}>
              <Tabs defaultActiveKey="1" items={items} />
            </Grid2>
          </Grid2>
        </div>
      </Spin>
    </>
  )
}
