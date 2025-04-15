import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useMessage } from '.'
import { addItemToCart } from '../components/cart/features'
import { addToFavourite } from '../pages/user/features'
import { getToken } from '../utils'
export const useActionAddToCartAndFavourite = () => {
  const dispatch = useDispatch()
  const token = getToken()
  const navigate = useNavigate()
  const { isLogin } = useSelector((state) => state.auth)
  const { contextHolder, messageApi } = useMessage()

  const handleAddToFavourites = async (productId) => {
    if (!isLogin || !token) {
      return navigate('/login')
    }

    try {
      const response = await dispatch(
        addToFavourite({
          productId: productId
        })
      ).unwrap()
      if (response.status === 200) {
        messageApi.success(response.message)
      }
    } catch (error) {
      if (error && typeof error === 'object') {
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.warning(error.unconnect)
        }
      }
    }
  }

  const handleAddItemToCart = async (productId, quantity) => {
    const values = { productId, quantity }
    try {
      const response = await dispatch(addItemToCart({ request: values })).unwrap()

      if (response.status === 201) {
        messageApi.success(response.message)
      }
    } catch (error) {
      if (error && typeof error === 'object') {
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.warning(error.unconnect)
        }
      }
    }
  }
  return {
    handleAddItemToCart,
    handleAddToFavourites,
    contextHolder
  }
}
