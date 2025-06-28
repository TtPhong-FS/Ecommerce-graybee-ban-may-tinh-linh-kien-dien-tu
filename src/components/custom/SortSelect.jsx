import { useProductFilters } from '@/features/product/hooks/useProductFilter'
import { ArrowDownNarrowWide } from 'lucide-react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export default function SortSelect() {
  const { filters, setSorter } = useProductFilters()

  const getCurrentValue = () => {
    if (!filters.sortBy || !filters.order) return 'default'
    return `${filters.sortBy}-${filters.order}`
  }

  return (
    <Select value={getCurrentValue()} onValueChange={setSorter}>
      <SelectTrigger className="w-[150px] py-5 bg-white">
        <ArrowDownNarrowWide className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Sắp xếp theo" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="default">Nổi bật</SelectItem>
          <SelectItem value="name-asc">Từ A - Z</SelectItem>
          <SelectItem value="name-desc">Từ Z - A</SelectItem>
          <SelectItem value="price-asc">Giá tăng dần</SelectItem>
          <SelectItem value="price-desc">Giá giảm dần</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
