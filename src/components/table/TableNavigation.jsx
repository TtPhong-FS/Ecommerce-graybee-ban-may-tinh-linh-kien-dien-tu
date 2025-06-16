import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import PropTypes from 'prop-types'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function TableNavigation({ table }) {
  return (
    <div className="space-x-2 flex items-center">
      <Button
        className={'bg-white cursor-pointer'}
        variant="outline"
        size="sm"
        type="button"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeft />
      </Button>
      <Button
        className={'bg-white cursor-pointer'}
        variant="outline"
        size="sm"
        type="button"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeft />
      </Button>
      <Input
        max={table.getPageCount()}
        className="w-16 h-[32px]"
        type="number"
        onChange={(e) => {
          const page = e.target.value ? Number(e.target.value) - 1 : 0
          table.setPageIndex(page)
        }}
        value={table.getState().pagination.pageIndex + 1}
      />
      <span className="text-ring">of {table.getPageCount()}</span>
      <Button
        className={'bg-white cursor-pointer'}
        variant="outline"
        size="sm"
        type="button"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRight />
      </Button>
      <Button
        className={'bg-white cursor-pointer'}
        variant="outline"
        size="sm"
        type="button"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRight />
      </Button>
    </div>
  )
}

TableNavigation.propTypes = {
  table: PropTypes.object
}
