import { useSelector } from 'react-redux'
import ProductCard from '../../../components/cards/ProductCard'
export const Favourite = () => {
  const favourites = useSelector((state) => state.account.favourites)
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        {favourites?.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))}
      </div>
    </>
  )
}
