import { LoadingOutlined, RedoOutlined } from '@ant-design/icons'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMessage } from '../../../hooks'
import { Favourite } from '../components/Favourite'
import { getFavourites } from '../features/thunk'
export const FavouritePage = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const { contextHolder, messageApi } = useMessage()

  const handleReloadFavourites = async () => {
    try {
      setLoading(true)
      const res = await dispatch(getFavourites()).unwrap()
      if (res.status === 200) {
        messageApi.success(res.message)
        setLoading(false)
      }
    } catch (error) {
      if (error && typeof error === 'object') {
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.error(error.unconnect)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="flex items-center py-3 mb-4">
        <h2 className="title">Sản phẩm yêu thích</h2>
        <div className="ml-12">
          <IconButton onClick={handleReloadFavourites}>
            {loading ? <LoadingOutlined spin /> : <RedoOutlined />}
          </IconButton>
        </div>
      </div>
      <Favourite />
    </div>
  )
}
