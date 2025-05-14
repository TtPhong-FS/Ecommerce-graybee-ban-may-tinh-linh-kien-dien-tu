import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { addItemToCart } from '../components/cart/features'
import { handleAsync, handleAsyncSubmit } from '../components/func'
import { addToFavourite } from '../pages/user/features'
import { getToken } from '../utils'
export const useActionAddToCartAndFavourite = () => {
  const token = getToken()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLogin } = useSelector((state) => state.auth)

  const handleAddToFavourites = async (productId) => {
    if (!isLogin || !token) {
      return toast({
        title: 'Oh! no',
        description: 'Bạn phải đăng nhập mới có thể dùng tính năng này'
      })
    }

    await handleAsync({
      asyncAction: (id) => dispatch(addToFavourite(id)).unwrap(),
      onSuccess: (res) => {
        toast.success(res.message)
      },
      values: productId,
      toast
    })
  }

  const handleAddItemToCart = async (productId, quantity) => {
    const values = { productId, quantity }
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(addItemToCart(vals)).unwrap(),
      onSuccess: (res) => {
        toast(null, {
          description: (
            <>
              <h3 className="text-green-600 w-full block text-center mb-2">{res?.message}</h3>
              <div className="flex items-center gap-3">
                <img className="w-20 h-20 border border-input p-2" src={res?.data.product?.thumbnail} />
                <span className="">{res?.data?.product?.name}</span>
              </div>
            </>
          )
        })
      },
      toast,
      values
    })
  }
  return {
    handleAddItemToCart,
    handleAddToFavourites
  }
}
