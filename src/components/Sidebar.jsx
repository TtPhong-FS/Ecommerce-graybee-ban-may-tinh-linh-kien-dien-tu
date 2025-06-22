import { unFocusSidebar } from '@/store/redux/homeSlice'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
  const sidebar = useSelector((state) => state.home.sidebar)
  const sidebarMemo = useMemo(() => sidebar, [sidebar])
  const active = useSelector((state) => state.home.active)
  const dispatch = useDispatch()
  const handleUnFocus = () => {
    dispatch(unFocusSidebar())
  }

  return (
    <div className={`${active ? 'sticky top-25 z-40' : ''}`}>
      {active && <div className="fixed inset-0 bg-foreground opacity-70" onClick={() => handleUnFocus()}></div>}
      <div className="overflow-y-auto  relative">
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
    <div className="flex gap-2 w-full overflow-hidden " onMouseLeave={() => setActiveCategory(null)}>
      {/* Sidebar */}
      <div className="w-[220px] max-h-96 bg-white overflow-y-scroll rounded-xs">
        <ul className="">
          {categories.map((cat, index) => (
            <Link
              to={`/collections/${cat.type}/${cat.slug === null || cat.slug === '' ? '#' : cat.slug}`}
              key={index}
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
                      to={`/collections/${child.type}/${
                        child.slug === null || child.slug === '' ? activeCategory.slug : child.slug
                      }`}
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
  categories: PropTypes.array
}
