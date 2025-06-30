import { Button } from '@/components/ui/button'
import { useAppContext, useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { handleAsync } from '@/lib'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { Favourite } from '../components'
import { fetchFavouritesAsync } from '../redux'
export const FavouritePage = () => {
  const { t } = useCustomTranslate()
  const { dispatch } = useAppContext()

  const { isLoading, stop, start } = useLoading()

  const handleReloadFavourites = async () => {
    await handleAsync({
      asyncAction: () => dispatch(fetchFavouritesAsync()).unwrap(),
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
      <div className="flex items-center justify-between mb-8 px-4">
        <h5 className="font-bold text-secondary-foreground uppercase"> {t('customer:favourite.title')}</h5>
        <div className="ml-12">
          <Button
            disabled={isLoading('reload')}
            variant="outline"
            className="select-none h-[38px] cursor-pointer bg-primary-foreground"
            onClick={handleReloadFavourites}
          >
            {isLoading('reload') ? (
              <span className="flex items-center">
                <LoaderCircle className="animate-spin mr-2" />
                {t('common:loading')}
              </span>
            ) : (
              t('common:refresh')
            )}
          </Button>
        </div>
      </div>
      <Favourite />
    </div>
  )
}
