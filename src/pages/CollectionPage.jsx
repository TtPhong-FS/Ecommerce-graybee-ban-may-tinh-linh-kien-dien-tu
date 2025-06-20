import { ProductCard } from '@/components/cards'
import { fetchProductByCategorySlugAsync } from '@/features/collections/redux/collectionThunk'
import ProductEmpty from '@/features/product/components/ProductEmpty'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

export const CollectionPage = () => {
  const { dispatch } = useAppContext()

  const [products, setProducts] = useState([])

  const { slug } = useParams()

  useEffect(() => {
    const fetch = async () => {
      await handleAsync({
        asyncAction: (slug) => dispatch(fetchProductByCategorySlugAsync(slug)).unwrap(),
        onSuccess: (res) => {
          setProducts(res?.data)
        },
        toast,
        values: slug
      })
    }
    fetch()

    return () => {}
  }, [slug])

  console.log(products)

  return (
    <div>
      <div className="mb-12 mt-6">
        <h1>Kết quả tìm kiếm: {slug}</h1>
      </div>
      {products.length === 0 ? (
        <ProductEmpty />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 bg-white p-6 rounded-md">
          {products.map((product, index) => {
            return <ProductCard key={index} product={product} />
          })}
        </div>
      )}
    </div>
  )
}
