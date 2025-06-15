import { Sidebar } from '@/components'
import { ProductCard } from '@/components/cards'
import { selectProducts } from '@/features/product/redux/productSelector'
import { useAppContext } from '@/hooks'
import { unFocusSidebar } from '@/store/redux/homeSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const HomePage = () => {
  const { dispatch } = useAppContext()

  useEffect(() => {
    return () => {
      dispatch(unFocusSidebar())
    }
  }, [])

  const products = useSelector(selectProducts)

  return (
    <div>
      <Sidebar />
      {products?.length !== 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {products?.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      )}
    </div>
  )
}
