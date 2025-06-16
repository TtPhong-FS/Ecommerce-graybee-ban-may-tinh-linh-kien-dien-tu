import { useCustomTranslate } from '@/i18n'
import { Search } from 'lucide-react'
import PropTypes from 'prop-types'
import { Input } from '../ui/input'

export function TableInputSearch({ globalFilter, setGlobalFilter }) {
  const { t } = useCustomTranslate()
  return (
    <div className="relative mb-4 w-full">
      <Input
        placeholder={`${t('common:search')}`}
        className="pl-10 pr-4 w-1/2"
        value={globalFilter ?? ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
      />
      <Search size={16} className="absolute left-3 -translate-y-1/2 top-1/2 transform" />
    </div>
  )
}

TableInputSearch.propTypes = {
  setGlobalFilter: PropTypes.func,
  globalFilter: PropTypes.string
}
