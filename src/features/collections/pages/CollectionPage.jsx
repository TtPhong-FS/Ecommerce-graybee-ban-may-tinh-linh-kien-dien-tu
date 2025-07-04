import { ProductCard } from '@/components/cards'
import SortSelect from '@/components/custom/SortSelect'
import { Button } from '@/components/ui/button'
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import { fetchProductByCategorySlugAsync } from '@/features/collections/redux/collectionThunk'
import ProductEmpty from '@/features/product/components/ProductEmpty'
import { useProductFilters } from '@/features/product/hooks/useProductFilter'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const CollectionPage = () => {
  const { dispatch } = useAppContext()

  const { slug } = useParams()

  const [products, setProducts] = useState([])

  const [totalPages, setTotalPages] = useState(0)

  const { filters, setFilter } = useProductFilters()

  const page = filters.page

  const key = `page:${page}-sortBy:${filters.sortBy}-order:${filters.order}`

  const collections = useSelector((state) => state.collection?.collections?.[slug]?.[key])

  useEffect(() => {
    if (!collections || collections?.length === 0) {
      handleAsync({
        asyncAction: ({ slug, page, sortBy, order }) =>
          dispatch(fetchProductByCategorySlugAsync({ slug: slug, page: page, sortBy: sortBy, order: order })).unwrap(),
        onSuccess: (res) => {
          setTotalPages(res?.data.paginationInfo?.totalPages || 2)
          setProducts(res?.data.data)
        },
        values: { slug, page: filters.page, sortBy: filters.sortBy, order: filters.order }
      })
    } else {
      setProducts(collections)
    }
  }, [slug, filters.page, filters.sortBy, filters.order, collections, dispatch])

  const goToPage = (pageNum) => {
    setFilter('page', String(pageNum))
  }
  return (
    <div>
      <div className="bg-white p-6 max-md:py-4 max-md:px-0 rounded-md">
        {products.length > 0 && (
          <div className="mb-6 place-items-end">
            <SortSelect />
          </div>
        )}
        <div>
          {products.length === 0 ? (
            <ProductEmpty />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-4 ">
              {products.map((product, index) => {
                return <ProductCard key={index} product={product} />
              })}
            </div>
          )}
          {products.length > 0 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <Button variant="ghost">
                    <ChevronLeft onClick={() => goToPage(Math.max(page - 1, 1))} />
                  </Button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" isActive={page === i + 1} onClick={() => goToPage(i + 1)}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <Button variant="ghost">
                    <ChevronRight onClick={() => goToPage(page + 1)} />
                  </Button>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
