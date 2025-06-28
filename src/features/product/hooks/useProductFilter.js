import { useSearchParams } from 'react-router-dom'

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    price: searchParams.get('price') || '',
    condition: searchParams.get('condition') || '',
    warranty: searchParams.get('warranty') || '',
    brand: searchParams.get('brand') || '',
    sortBy: searchParams.get('sortBy') || null,
    order: searchParams.get('order') || null,
    page: parseInt(searchParams.get('page') || '1')
  }

  const setFilter = (key, value) => {
    if (value) {
      searchParams.set(key, value)
    } else {
      searchParams.delete(key)
    }
    if (key !== 'page') {
      searchParams.set('page', '1')
    }
    setSearchParams(searchParams)
  }

  const removeFilter = (key) => {
    searchParams.delete(key)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const clearAllFilters = () => {
    ;['price', 'condition', 'warranty', 'brand', 'sortBy', 'order'].forEach((key) => {
      searchParams.delete(key)
    })
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const setSorter = (value) => {
    if (value === 'default') {
      searchParams.delete('sortBy')
      searchParams.delete('order')
    } else {
      const [sortBy, order] = value.split('-')
      searchParams.set('sortBy', sortBy)
      searchParams.set('order', order)
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  return {
    filters,
    setFilter,
    removeFilter,
    clearAllFilters,
    setSorter
  }
}
