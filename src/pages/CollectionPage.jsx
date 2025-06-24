import { ProductCard } from '@/components/cards'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { fetchProductByCategorySlugAsync } from '@/features/collections/redux/collectionThunk'
import ProductEmpty from '@/features/product/components/ProductEmpty'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { ArrowDownNarrowWide } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

export const CollectionPage = () => {
  const { dispatch } = useAppContext()

  const [products, setProducts] = useState([])

  const { slug, type } = useParams()

  const [searchParams, setSearchParams] = useSearchParams([])

  const page = parseInt(searchParams.get('page') || '1')
  const size = parseInt(searchParams.get('size') || '15')

  const handleSorter = (value) => {
    alert(value)
    setSearchParams(new URLSearchParams(value))
  }
  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set('page', String(newPage))
      return prev
    })
  }

  const handleSizeChange = (newLimit) => {
    setSearchParams((prev) => {
      prev.set('size', String(newLimit))
      prev.set('page', '1')
      return prev
    })
  }

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
      <div>
        <div className="mb-6 place-items-end">
          <Select onValueChange={(value) => handleSorter(value)}>
            <SelectTrigger className="w-[150px] py-5 bg-white">
              <ArrowDownNarrowWide />
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="default">Nổi bật</SelectItem>
                <SelectItem value="?sortBy=name&order=asc">Từ A - Z</SelectItem>
                <SelectItem value="?sortBy=name&order=desc">Từ Z - A</SelectItem>
                <SelectItem value="?sortBy=price&order=asc">Giá tăng dần</SelectItem>
                <SelectItem value="?sortBy=price&order=asc">Giá giảm dần</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
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
      </div>
      <div className="mt-6 bg-white p-4 rounded-md">
        <Pagination>
          <PaginationContent>
            <PaginationItem className="cursor-pointer">
              <PaginationPrevious onClick={() => handlePageChange(Math.max(page - 1, 1))} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="cursor-pointer">
              <PaginationNext onClick={() => handlePageChange(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
