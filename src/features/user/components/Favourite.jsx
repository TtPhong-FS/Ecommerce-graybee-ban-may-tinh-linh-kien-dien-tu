import { ProductCard } from '@/components/cards'
import { useSelector } from 'react-redux'
export const Favourite = () => {
  const favourites = useSelector((state) => state.account.favourites)
  return (
    <>
      {favourites?.length > 0 ? (
        <div className="grid grid-cols-4 gap-2">
          {favourites?.map((product, index) => (
            <ProductCard data={product} key={index} />
          ))}
        </div>
      ) : (
        <div className="p-4 text-sm rounded-md text-center select-none bg-primary-foreground text-muted-foreground">
          Chưa có sản phẩm yêu thích nào!
        </div>
      )}
    </>
  )
}
