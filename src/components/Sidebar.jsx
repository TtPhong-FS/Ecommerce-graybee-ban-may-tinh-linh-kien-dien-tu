import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  const sidebar = useSelector((state) => state.home.sidebar)
  const sidebarMemo = useMemo(() => sidebar, [sidebar])
  const active = true
  return (
    <div className={`${active ? 'sticky top-25 z-40' : ''}`}>
      <div className="h-full overflow-y-auto">
        <MegaSidebar categories={sidebarMemo} />
      </div>
    </div>
  )
}
const MegaSidebar = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false)

  const handleMouseEnter = (cat) => {
    setActiveCategory(cat)
    setIsMegaMenuVisible(true)
  }
  return (
    <div className="flex gap-2 w-full" onMouseLeave={() => setActiveCategory(null)}>
      {/* Sidebar */}
      <div className="w-[250px] bg-white">
        <ul className="">
          {categories.map((cat) => (
            <Link
              to={`/collections/${cat.slug}`}
              key={cat.slug}
              onMouseEnter={() => handleMouseEnter(cat)}
              className="flex font-semibold text-sm items-center justify-between p-2 text-gray-800 hover:bg-secondary/90 rounded-sm hover:text-primary-foreground cursor-pointer"
            >
              {cat.name}
            </Link>
          ))}
        </ul>
      </div>

      {/* Mega Menu */}
      {isMegaMenuVisible && activeCategory?.children?.length > 0 && (
        <div className="flex-1 bg-white px-6 py-4 grid grid-cols-4 gap-4">
          {activeCategory.children.map((column) => (
            <div key={column.slug}>
              <h4 className="font-bold text-red-600 text-sm mb-2">{column.name}</h4>
              <ul className="space-y-1">
                {column.children.map((child) => (
                  <Link
                    to={`/collections/${child.slug}`}
                    key={child.slug}
                    className="text-sm text-gray-700 hover:text-primary cursor-pointer"
                  >
                    {child.name}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

MegaSidebar.propTypes = {
  categories: PropTypes.array
}
