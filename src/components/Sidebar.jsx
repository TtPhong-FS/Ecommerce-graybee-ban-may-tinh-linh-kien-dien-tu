import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const sidebar = useSelector((state) => state.home.sidebar)
  const sidebarMemo = useMemo(() => sidebar, [sidebar])

  return (
    <div className={`${openSidebar ? 'sticky top-25 z-40' : ''}`}>
      {openSidebar && (
        <div className="fixed inset-0 bg-foreground opacity-70" onClick={() => setOpenSidebar(false)}></div>
      )}
      <div className="overflow-y-auto z-40 relative">
        <MegaSidebar categories={sidebarMemo} setOpenSidebar={setOpenSidebar} />
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  openSidebar: PropTypes.bool,
  setOpenSidebar: PropTypes.func
}

const MegaSidebar = ({ categories, setOpenSidebar }) => {
  const [activeCategory, setActiveCategory] = useState(null)
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false)

  const handleMouseEnter = (cat) => {
    setActiveCategory(cat)
    setIsMegaMenuVisible(true)
  }
  return (
    <div className="flex gap-2 w-full overflow-hidden " onMouseLeave={() => setActiveCategory(null)}>
      {/* Sidebar */}
      <div className="w-[220px] max-h-96 bg-white overflow-y-scroll rounded-xs">
        <ul className="">
          {categories.map((cat, index) => (
            <Link
              to={`/collections/${cat.slug === null || cat.slug === '' ? '#' : cat.slug}`}
              key={index}
              onClick={() => setOpenSidebar(false)}
              onMouseEnter={() => handleMouseEnter(cat)}
              className="flex relative text-sm items-center justify-between p-2 text-gray-800 hover:bg-secondary/90 hover:text-primary-foreground cursor-pointer "
            >
              {cat.name}
            </Link>
          ))}
        </ul>
      </div>

      {/* Mega Menu */}
      {isMegaMenuVisible && activeCategory?.children?.length > 0 && (
        <div className="flex-1 bg-white px-6 py-4 grid grid-cols-4 gap-4 overflow-hidden">
          {activeCategory.children.map((column, index) => {
            return (
              <div key={index}>
                <h4 className="font-bold text-red-600 text-sm mb-2">{column.name}</h4>
                <ul className="space-y-1">
                  {column.children.map((child, index) => (
                    <Link
                      onClick={() => setOpenSidebar(false)}
                      to={`/collections/${child.slug === null || child.slug === '' ? activeCategory.slug : child.slug}`}
                      key={index}
                      className="text-sm flex flex-col gap-2 text-gray-700 hover:text-red-600 cursor-pointer"
                    >
                      {child.name}
                    </Link>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

MegaSidebar.propTypes = {
  categories: PropTypes.array,
  setOpenSidebar: PropTypes.func
}
