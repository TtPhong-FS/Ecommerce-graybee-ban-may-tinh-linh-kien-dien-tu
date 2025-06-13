import { ProductCard } from '@/components/cards'
import { fetchProductByCategorySlugAsync } from '@/features/collections/redux/collectionThunk'
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
      {products.length === 0 ? (
        'Hiện tại không có sản phẩm nào'
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5">
          {products.map((product, index) => {
            return <ProductCard key={index} data={product} />
          })}
        </div>
      )}
    </div>
  )
}
