import { ProductCard } from '@/components/cards'
import { fetchProductByCategorySlugAsync } from '@/features/collections/redux/collectionThunk'
import ProductEmpty from '@/features/product/components/ProductEmpty'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const CollectionPage = () => {
  const { dispatch } = useAppContext()

  const [products, setProducts] = useState([])

  const searchParams = useParams()
  const slug = searchParams.slug
  const type = searchParams.type

  useEffect(() => {
    const fetch = async () => {
      await handleAsync({
        asyncAction: ({ slug, type }) => dispatch(fetchProductByCategorySlugAsync({ slug: slug, type: type })).unwrap(),
        onSuccess: (res) => {
          setProducts(res?.data)
        },
        values: { slug, type }
      })
    }
    fetch()

    return () => {}
  }, [slug, type, dispatch])

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
