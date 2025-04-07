import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { IconButton } from '@mui/material'
import { Image } from 'antd'
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { useMessage } from '../../../hooks'
import { isPresentInFavorites } from '../../../utils'
import { addToFavourite } from '../features/thunk'
export const Favourite = () => {
  const favourites = useSelector((state) => state.account.favourites)
  const dispatch = useDispatch()
  const token = Cookies.get('token')

  const { contextHolder, messageApi } = useMessage()

  const handleAddToFavourites = async (productId) => {
    try {
      const response = await dispatch(
        addToFavourite({
          token: token,
          productId: productId
        })
      ).unwrap()
      console.log('Success:', response)
    } catch (error) {
      if (error && typeof error === 'object') {
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.error(error.unconnect)
        }
      }
    }
  }

  return (
    <>
      {contextHolder}

      <div className="grid grid-cols-3 gap-2">
        {favourites?.map((item, index) => (
          <div key={index} className="bg-white border-1 rounded-lg border-gray-200 gap-3 p-3">
            <article className="bg-transparent rounded-sm w-full h-auto" key={index}>
              <div className="p-1">
                <div className="mb-3 flex justify-center">
                  <Image width={150} height={140} src={item.thumbnail} />
                </div>
                <div className="flex flex-col gap-2 h-[7rem]">
                  <div className="h-[5rem]">
                    <p className="font-semibold text-[#090d14] text-[1rem] max-sm:text-[12.8px] line-clamp-3">
                      {item.name}
                    </p>
                  </div>
                  <div className="h-[1rem]">
                    <span className="font-medium text-lg font-sans ml-1 text-red-500 max-sm:text-[12px]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.finalPrice)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center gap-2 mt-4">
                  <IconButton onClick={() => handleAddToFavourites(item.id)}>
                    {isPresentInFavorites(favourites, item?.id) ? (
                      <HeartFilled style={{ fontSize: '1.8rem', color: '#fb2c36' }} />
                    ) : (
                      <HeartOutlined style={{ fontSize: '1.8rem' }} />
                    )}
                  </IconButton>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </>
  )
}
