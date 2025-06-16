import PropTypes from 'prop-types'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const pageSizeMap = [5, 10, 20, 30, 50, 100]

export function TablePagination({ table }) {
  const pageSize = table.getState().pagination.pageSize

  return (
    <Select
      value={pageSize}
      onValueChange={(value) => {
        table.setPageSize(Number(value))
      }}
    >
      <SelectTrigger className="cursor-pointer">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {pageSizeMap.map((pageSize) => (
            <SelectItem key={pageSize} value={pageSize}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

TablePagination.propTypes = {
  table: PropTypes.object
}
