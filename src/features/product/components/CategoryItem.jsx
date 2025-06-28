import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function CategoryItem({ name, slug, imageUrl }) {
  return (
    <Link
      to={`/collections/${slug}`}
      className="flex flex-col items-center p-2 border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:translate-y-[-2px] transition-all duration-200 cursor-pointer bg-white"
    >
      <img src={imageUrl} alt={name} className="w-12 h-12 mb-2 object-contain sm:w-10 sm:h-10 md:w-12 md:h-12" />
      <span className="text-sm text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full text-center sm:text-xs md:text-sm">
        {name}
      </span>
    </Link>
  )
}

CategoryItem.propTypes = {
  name: PropTypes.string,
  slug: PropTypes.string,
  imageUrl: PropTypes.string
}

export default CategoryItem
