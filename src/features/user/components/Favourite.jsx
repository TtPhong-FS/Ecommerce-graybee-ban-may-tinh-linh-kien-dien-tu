import { ProductCard } from '@/components/cards'
import { useCustomTranslate } from '@/i18n'
import { useSelector } from 'react-redux'
export const Favourite = () => {
  const { t } = useCustomTranslate()
  const favourites = useSelector((state) => state.account.favourites)
  return (
    <>
      {favourites?.length > 0 ? (
        <div className="grid grid-cols-4 gap-2">
          {favourites?.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      ) : (
        <div className="p-4 text-sm rounded-md text-center select-none bg-primary-foreground text-muted-foreground">
          {t('customer:favourite.empty')}
        </div>
      )}
    </>
  )
}
