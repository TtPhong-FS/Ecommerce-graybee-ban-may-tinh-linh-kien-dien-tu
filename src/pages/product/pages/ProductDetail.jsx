import { HeartFilled, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Grid2, IconButton } from '@mui/material'
import { Button, Image, Tabs, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../../../components/Loading'

import { useActionAddToCartAndFavourite } from '../../../hooks'
import { isPresentInFavorites } from '../../../utils'
import { Description } from '../components/Description'
import { GeneralInfo } from '../components/GeneralInfo'
import { ReviewComment } from '../components/ReviewComment'
import { getDetailById } from '../features/thunk'

const items = [
  {
    key: 'general_info',
    label: 'Thông tin chung',
    children: <GeneralInfo />
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

  const details = useSelector((state) => state.product?.details)
  const favourites = useSelector((state) => state.account.favourites)

  const { contextHolder, handleAddItemToCart, handleAddToFavourites } = useActionAddToCartAndFavourite()
  useEffect(() => {
    if (id) {
      if (!details || details?.id !== id) {
        dispatch(getDetailById({ id }))
      }
      setLoading(false)
    }
  }, [id, dispatch, details])

  if (!details || details === null) {
    return <Loading />
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="">
      {contextHolder}
      <div className="">
        <div className="flex gap-2 mb-4">
          <a href="" className="text-blue-600 text-[1.1rem] hover:underline decoration-solid">
            Sản phẩm
          </a>
          <span className="text-[1.2rem] text-gray-500">/</span>
          <span className="text-gray-500  text-[1.1rem] select-text">
            {details?.name?.toUpperCase().substring(0, 50)}
          </span>
        </div>
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
                  <div className="flex items-center justify-end mb-6">
                    <Image width={200} height={200} src={details?.thumbnail} alt="" />
                  </div>
                </div>
              </Grid2>
              <Grid2 size={7} sx={{ padding: '1rem' }}>
                <h1 className="text-2xl font-medium ">{details?.name}</h1>
                <div className="flex mt-4 mb-4 gap-3 items-center">
                  <span className="font-medium text-[2rem] font-sans text-red-500 max-sm:text-[0.9rem]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(details?.finalPrice)}
                  </span>
                  <del className="font-medium text-[1.4rem] text-gray-500 max-sm:text-[0.6rem]">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(details?.price)}
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
                <div className="flex gap-10 justify-center items-center mt-10">
                  <div className="block">
                    <IconButton onClick={() => handleAddToFavourites(details?.id)}>
                      {isPresentInFavorites(favourites, details?.id) ? (
                        <HeartFilled style={{ fontSize: '1.8rem', color: '#fb2c36' }} />
                      ) : (
                        <HeartOutlined style={{ fontSize: '1.8rem' }} />
                      )}
                    </IconButton>
                  </div>
                  <div className="w-maxs">
                    <Button
                      icon={<ShoppingCartOutlined style={{ fontSize: '1.7rem' }} />}
                      style={{ width: '10rem', height: '2.8rem' }}
                      onClick={() => handleAddItemToCart(details?.id, 1)}
                      type="primary"
                    />
                  </div>
                </div>
              </Grid2>
            </Grid2>
            <Grid2 size={7}>
              <Tabs defaultActiveKey="1" items={items} />
            </Grid2>
          </Grid2>
        </div>
      </div>
    </div>
  )
}
