import { ProductCard } from '@/components/cards'
import SortSelect from '@/components/custom/SortSelect'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { fetchProductByCategorySlugAsync } from '@/features/collections/redux/collectionThunk'
import ProductEmpty from '@/features/product/components/ProductEmpty'
import { useProductFilters } from '@/features/product/hooks/useProductFilter'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const CollectionPage = () => {
  const { dispatch } = useAppContext()

  const [products, setProducts] = useState([])

  const { slug } = useParams()
  const [totalPages, setTotalPages] = useState(0)

  const { filters, setFilter } = useProductFilters()

  useEffect(() => {
    handleAsync({
      asyncAction: ({ slug, page, sortBy, order }) =>
        dispatch(fetchProductByCategorySlugAsync({ slug: slug, page: page, sortBy: sortBy, order: order })).unwrap(),
      onSuccess: (res) => {
        setTotalPages(res?.paginationInfo?.totalPages || 2)
        setProducts(res?.data)
      },
      values: { slug, page: filters.page, sortBy: filters.sortBy, order: filters.order }
    })
  }, [slug, filters.page, filters.sortBy, filters.order, dispatch])

  const page = filters.page

  const goToPage = (pageNum) => {
    setFilter('page', String(pageNum))
  }
  return (
    <div>
      <div className="mb-12 mt-6">
        <h1>Kết quả tìm kiếm: {slug}</h1>
      </div>
      <div className="bg-white p-6 rounded-md">
        {products.length > 0 && (
          <div className="mb-6 place-items-end">
            <SortSelect />
          </div>
        )}
        <div>
          {products.length === 0 ? (
            <ProductEmpty />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 ">
              {products.map((product, index) => {
                return <ProductCard key={index} product={product} />
              })}
            </div>
          )}
          {products.length > 0 && (
            <div className="mt-12">
              <Pagination>
                <PaginationContent>
                  <PaginationItem className="cursor-pointer">
                    <PaginationPrevious onClick={() => goToPage(Math.max(page - 1, 1))} />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink href="#" isActive={page === i + 1} onClick={() => goToPage(i + 1)}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem className="cursor-pointer">
                    <PaginationNext onClick={() => goToPage(page + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
