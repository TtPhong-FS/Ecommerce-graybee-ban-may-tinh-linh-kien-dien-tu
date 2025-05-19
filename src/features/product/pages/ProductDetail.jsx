import { Button } from '@/components/ui/button'
import { useUserData } from '@/features/user/data'
import { formattedPrice, isPresentInFavorites } from '@/utils'
import { HeartFilled } from '@ant-design/icons'
import { Grid2 } from '@mui/material'
import { Image, Spin, Tabs, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const id = useSelector((state) => state.product.productId)

  const details = useSelector((state) => state.product.details)

  const { favourites } = useUserData()

  const { handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()

  useEffect(() => {
    if (id) {
      if (!details || details?.id !== id) {
        dispatch(fetchProductDetailByIdAsync(id))
      }
    }
    setLoading(false)
  }, [id, dispatch, details])

  if (!details || details === null) {
    return <div>Không có sản phẩm...</div>
  }

  return (
    <>
      <Spin spinning={loading}>
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
                    <Tag
                      style={{
                        borderColor: '#fb2c36',
                        fontWeight: 600,
                        color: '#fb2c36',
                        fontSize: '0.9rem',
                        height: '2rem',
                        width: '3rem',
                        placeContent: 'center'
                      }}
                    >
                      -{details?.discountPercent}%
                    </Tag>
                  </span>
                </div>
                <div className="text-base box">
                  <p className="content">Thương hiệu: {details?.manufacturerName}</p>
                  <p className="content">Tình trạng: {details?.conditions}</p>
                  <p className="content">Bảo hàng: {details?.warranty} tháng</p>
                  {details?.weight !== 0 ? <p className="content">Cân nặng: {details?.weight}kg</p> : null}
                  {details?.color && <p className="content">Màu: {details?.color}</p>}
                </div>
                <div className="flex gap-10 justify-center items-center mt-10">
                  <div className="block">
                    <Button
                      variant="outline"
                      className="cursor-pointer h-[45px]"
                      onClick={() => handleAddToFavourites(details?.id)}
                    >
                      {isPresentInFavorites(favourites, details?.id) ? (
                        <HeartFilled style={{ fontSize: '1.8rem', color: '#fb2c36' }} />
                      ) : (
                        'Thêm vào yêu thích'
                      )}
                    </Button>
                  </div>
                  <div className="w-maxs">
                    <Button
                      onClick={() => handleAddItemToCart(details?.id, 1)}
                      type="button"
                      variant="secondary"
                      className="cursor-pointer h-[45px]"
                    >
                      Thêm vào giỏ hàng
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
