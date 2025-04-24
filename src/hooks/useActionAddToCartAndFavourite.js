import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItemToCart } from '../components/cart/features'
import { handleAsync, handleAsyncSubmit } from '../components/func'
import { addToFavourite } from '../pages/user/features'
import { getToken } from '../utils'
export const useActionAddToCartAndFavourite = (openNotificationWithIcon) => {
  const token = getToken()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLogin } = useSelector((state) => state.auth)

  const handleAddToFavourites = async (productId) => {
    if (!isLogin || !token) {
      return navigate('/login')
    }

    await handleAsync({
      asyncAction: (id) => dispatch(addToFavourite({ productId: id })).unwrap(),
      onSuccess: (res) => {
        openNotificationWithIcon('success', 'Thành công', res.message)
      },
      values: productId,
      openNotificationWithIcon
    })
  }

  const handleAddItemToCart = async (productId, quantity) => {
    const values = { productId, quantity }

    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(addItemToCart({ request: vals })).unwrap(),
      onSuccess: (res) => {
        openNotificationWithIcon('success', 'Thành công', res.message)
      },
      openNotificationWithIcon,
      values
    })
  }
  return {
    handleAddItemToCart,
    handleAddToFavourites
  }
}
