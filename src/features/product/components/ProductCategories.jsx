import { useSelector } from 'react-redux'
import { renderImageProductCategory } from '../helpers/renderImageProductCategory'
import CategoryItem from './CategoryItem'

function ProductCategories() {
  const sidebar = useSelector((state) => state.home.sidebar)
  const categories = sidebar?.map(({ name, slug }) => ({
    name,
    slug,
    imageUrl: 'https://file.hstatic.net/200000636033/file/icon1_ce115f32db874a8e9b5af39517176e96.png'
  }))

  return (
    categories?.length > 0 && (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h1 className="mb-6">Danh mục sản phẩm</h1>
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
