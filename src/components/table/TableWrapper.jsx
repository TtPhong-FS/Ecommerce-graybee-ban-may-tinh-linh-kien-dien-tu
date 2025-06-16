import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { TableNavigation } from './TableNavigation'
import { TablePagination } from './TablePagination'

export default function TableWrapper({ loading = false, columns = [], data = [] }) {
  const [sorting, setSorting] = React.useState([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState('')

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),

    onRowSelectionChange: setRowSelection,

    initialState: {
      pagination: {
        pageSize: 5
      }
    },

    state: {
      globalFilter,
      sorting,
      rowSelection
    }
  })

  return (
    <div className="">
      <div className="flex items-center py-4">
        {/* <TableInputSearch globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} /> */}
      </div>
      <Spin spinning={loading}>
        <div className="custom-scrollbar overflow-x-auto border">
          <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    let headerClass = 'p-2'
                    if (header.column.id === 'status') {
                      headerClass = 'sticky bg-[var(--primary-foreground)] right-12 z-10 w-[140px] max-w-[140px]'
                    }
                    if (header.column.id === 'actions') {
                      headerClass = 'sticky bg-[var(--primary-foreground)] right-0 w-[60px]  z-10 max-w-[80px]'
                    }
                    return (
                      <TableHead className={`${headerClass} max-w-[250px]`} key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => {
                      let cellClass = 'p-4'
                      if (cell.column.id === 'status') {
                        cellClass = 'sticky bg-[var(--primary-foreground)] right-12  z-10 max-w-[140px]  w-[140px]'
                      }

                      if (cell.column.id === 'actions') {
                        cellClass = 'sticky bg-[var(--primary-foreground)] right-0  z-10 w-[60px] max-w-[80px]'
                      }
                      return (
                        <TableCell className={`${cellClass} max-w-[250px]`} key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                    Không có dữ liệu.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Spin>
      <div className="flex items-center justify-end space-x-2 py-4">
        <TablePagination table={table} />

        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <TableNavigation table={table} />
      </div>
    </div>
  )
}

TableWrapper.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  loading: PropTypes.bool,
  renderToolOptions: PropTypes.func,
  expanded: PropTypes.object,
  grouping: PropTypes.array
}
