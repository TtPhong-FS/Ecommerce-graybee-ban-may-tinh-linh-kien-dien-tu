import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLoading } from '@/hooks'
import { handleAsync } from '@/lib'
import { formattedPrice } from '@/utils'
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
    if (!details) {
      handleAsync({
        asyncAction: (slug) => dispatch(fetchProductDetailByIdAsync(slug)).unwrap(),
        onSuccess: () => {
          setReady(true)
        },
        values: slug,
        toast
      })
    } else {
      setReady(true)
    }
  }, [slug, dispatch, details])

  return (
    <>
      {!ready ? (
        <Skeleton className="bg-white h-screen w-full" />
      ) : (
        <div className="select-text bg-white p-2 rounded-md">
          <div className="mb-6">
            <div className="grid grid-cols-12">
              <div className="col-span-6 max-md:col-span-12">
                <div>
                  <div className="flex items-center justify-center mb-6 ">
                    <img className="lg:w-1/2 w-10/12 " src={details?.thumbnail} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-span-6 max-md:col-span-12 max-md:px-2 place-content-end">
                <h1>{details?.name}</h1>
                <div className="flex mt-4 mb-4 gap-3 items-center">
                  <span className="font-medium text-[2rem] font-sans text-red-500 max-md:text-xl">
                    {formattedPrice(details?.finalPrice)}
                  </span>
                  <del className="font-medium text-[1.4rem] text-gray-500 max-md:text-lg">
                    {formattedPrice(details?.price)}
                  </del>
                  <Badge variant="destructive">-{details?.discountPercent}%</Badge>
                </div>
                <div className="text-base box">
                  {details?.brandName !== null && details?.brandName !== '' && (
                    <p className="content">Thương hiệu: {details?.brandName}</p>
                  )}
                  <p className="content">Tình trạng: {details?.conditions === 'NEW' ? 'Mới' : 'Cũ'}</p>
                  <p className="content">Bảo hàng: {details?.warranty} tháng</p>
                </div>
                <div className="flex gap-10 justify-center items-center mt-10">
                  <div className="w-full">
                    <Button
                      disabled={isLoading(`addFavorite:${details?.productId}`)}
                      onClick={() => handleAddToFavourites(details?.productId)}
                      variant="destructive"
                      className="py-7 max-md:py-6 cursor-pointer w-full text-xl max-md:text-base"
                    >
                      <Heart /> Yêu thích
                    </Button>
                  </div>
                  <div className="w-full">
                    <Button
                      disabled={isLoading(`addItemToCart:${details?.productId}`)}
                      onClick={() => handleAddItemToCart(details?.productId)}
                      variant="secondary"
                      className="py-7 max-md:py-6 cursor-pointer w-full text-xl max-md:text-base"
                    >
                      <ShoppingCart />
                      Thêm vào giỏ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Tabs defaultValue="specifications">
            <TabsList>
              {items.map((item) => (
                <TabsTrigger key={item.key} value={item.key}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {items.map((item) => (
              <TabsContent key={item.key} value={item.key}>
                {item.children}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
      {/* <Spin spinning={!ready}>
      </Spin> */}
    </>
  )
}
