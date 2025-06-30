import { addItemToCartAsync } from '@/features/cart'
import { addToFavoriteByProductIdAsync } from '@/features/user/redux'
import { useAppContext } from '@/hooks'
import { handleAsync, handleAsyncSubmit } from '@/lib'
import { getSession, getToken, session } from '@/utils'
import { toast } from 'sonner'
export const useActionAddToCartAndFavourite = (start, stop) => {
  const token = getToken()
  const sessionId = getSession()
  const { dispatch } = useAppContext()

  const handleAddToFavourites = async (productId) => {
    if (!token) {
      return toast.message('Oh no!', {
        description: 'Bạn phải đăng nhập mới có thể dùng tính năng này'
      })
    }

    await handleAsync({
      asyncAction: (productId) => dispatch(addToFavoriteByProductIdAsync(productId)).unwrap(),
      onSuccess: (res) => {
        toast.success(res.data.message)
      },
      values: productId,
      toast,
      loadingKey: `addFavorite:${productId}`,
      startLoading: start,
      stopLoading: stop
    })
  }

  const handleAddItemToCart = async (productId) => {
    if (!token && !sessionId) {
      try {
        await session()
      } catch (error) {
        console.error('Không thể khởi tạo session:', error)
        toast.error('Không thể tạo session. Vui lòng thử lại sau.')
        return
      }
    }

    await handleAsyncSubmit({
      asyncAction: (productId) => dispatch(addItemToCartAsync(productId)).unwrap(),
      onSuccess: (res) => {
        toast(null, {
          description: (
            <>
              <h3 className="text-green-600 w-full block text-center mb-2">{res?.message}</h3>
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 border border-input p-2" src={res?.data.product?.thumbnail} />
                <span className="">{res?.data?.product?.name}</span>
              </div>
            </>
          )
        })
      },
      toast,
      values: productId,
      loadingKey: `addItemToCart:${productId}`,
      startLoading: start,
      stopLoading: stop
    })
  }
  return {
    handleAddItemToCart,
    handleAddToFavourites
  }
}
