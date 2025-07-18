import { useSelector } from 'react-redux'
import { renderImageProductCategory } from '../helpers/renderImageProductCategory'
import CategoryItem from './CategoryItem'

function ProductCategories() {
  const sidebar = useSelector((state) => state.home.sidebar)
  const categories = sidebar?.map(({ name, slug }) => ({
    name,
    slug,
    imageUrl: ''
  }))

  return (
    categories?.length > 0 && (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="mb-6">
          <h5 className="font-bold text-gray-800 uppercase">Danh mục sản phẩm</h5>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-3 sm:gap-4">
          {categories.map((category, index) => {
            const imageCategory = renderImageProductCategory(category.name)
            return <CategoryItem key={index} name={category.name} slug={category.slug} imageUrl={imageCategory} />
          })}
        </div>
      </div>
    )
  )
}

export default ProductCategories
