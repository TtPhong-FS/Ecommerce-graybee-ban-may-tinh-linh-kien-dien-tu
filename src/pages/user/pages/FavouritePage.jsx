import { handleAsync } from '@/components/func'
import { Button } from '@/components/ui/button'
import useAppContext from '@/hooks/useAppContext'
import useLoading from '@/hooks/useLoading'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Favourite } from '../components/Favourite'
import { getFavourites } from '../features/thunk'
export const FavouritePage = () => {
  const { dispatch } = useAppContext()

  const { isLoading, stop, start } = useLoading()

  const handleReloadFavourites = async () => {
    await handleAsync({
      asyncAction: () => dispatch(getFavourites()).unwrap(),
      toast,
      onSuccess: (res) => {
        toast.success(res.message)
      },
      loadingKey: 'reload',
      startLoading: start,
      stopLoading: stop
    })
  }

  return (
    <div>
      <div className="flex items-center py-3 mb-4">
        <h1>Sản phẩm yêu thích</h1>
        <div className="ml-12">
          <Button variant="secondary" className="select-none h-[38px] cursor-pointer" onClick={handleReloadFavourites}>
            {isLoading('reload') ? (
              <span className="flex items-center">
                <LoaderCircle className="animate-spin mr-2" />
                Đang tải
              </span>
            ) : (
              'Làm mới'
            )}
          </Button>
        </div>
      </div>
      <Favourite />
    </div>
  )
}
