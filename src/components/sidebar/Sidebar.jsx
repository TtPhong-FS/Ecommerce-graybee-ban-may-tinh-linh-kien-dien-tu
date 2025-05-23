import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../Loading'
import { unFocusSidebar } from './redux/slice'
export const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const active = useSelector((state) => state.sidebar.active)
  const menus = useSelector((state) => state.sidebar.menus)

  const [activeCategory, setActiveCategory] = useState(null)
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false)
  const [show, setShow] = useState(false)

  const handleUnFocus = () => {
    dispatch(unFocusSidebar())
  }

  const onMouse = () => {
    setIsMegaMenuVisible(true)
    setShow(true)
  }

  const onLeave = () => {
    setIsMegaMenuVisible(false)
    setShow(false)
  }

  const formatQueryParam = (param) =>
    param
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const handleFindByCateogryAndManufacturer = (category, manufacturer) => {
    navigate(`pages/${category.toLowerCase()}/${manufacturer.toLowerCase()}`)
    const queryString = `find/products?category=${formatQueryParam(category)}&manufacturer=${formatQueryParam(
      manufacturer
    )}`

    console.log(queryString)
  }

  const handleFindByCategory = (category) => {
    navigate(`pages/${category.toLowerCase()}`)
    // dispatch(findByCategory({ category: category }))
  }

  const handleFindByCategoryAndSubcategoryAndTag = (category, subcategory, tag) => {
    navigate(`pages/${category.toLowerCase()}/${tag.toLowerCase()}`)
    const queryString = `find/products?category=${formatQueryParam(category)}&subcategory=${formatQueryParam(
      subcategory
    )}&tag=${formatQueryParam(tag)}`

    console.log(queryString)
  }

  if (!menus || menus.length === 0) {
    return <Loading />
  }

  return (
    <div className={`${active ? 'sticky top-25 z-40' : ''}`}>
      {active && <div className="fixed inset-0 bg-foreground/80 opacity-80" onClick={() => handleUnFocus()}></div>}
      <div className="flex min-h-100 gap-2 relative" onMouseLeave={onLeave}>
        {/* Sidebar 15% */}
        <div
          className={`hidden md:block w-[15%] rounded-sm overflow-y-auto scroll-smooth transition-all duration-300 ${
            active ? 'shadow-lg z-40 bg-white' : ''
          }`}
          onMouseEnter={onMouse}
        >
          <nav className="flex flex-col bg-white h-full cursor-pointer rounded-sm">
            {menus.map((category) => (
              <div key={category.id}>
                <h4
                  onClick={() => handleFindByCategory(category.name)}
                  className="flex font-semibold text-sm items-center justify-between p-2   text-gray-800 hover:bg-secondary/90 rounded-sm hover:text-primary-foreground cursor-pointer"
                  onMouseEnter={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </h4>
              </div>
            ))}
          </nav>
        </div>
        {show && (
          <div className="w-[85%] rounded-e-sm rounded-s-sm" onMouseEnter={onMouse} onMouseLeave={onLeave}>
            {/* Mega Menu 85% */}
            <div
              className={`mega-menu ${
                isMegaMenuVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
              } rounded-e-sm `}
            >
              {menus.map(
                (category) =>
                  activeCategory === category.id && (
                    <div key={category.id} className="w-full flex flex-wrap">
                      <div className="w-1/3 p-2">
                        <h3 className="text-secondary">Thương hiệu</h3>
                        <ul className="mt-2">
                          {category.manufacturers?.map((manufacturer) => (
                            <li
                              onClick={() => handleFindByCateogryAndManufacturer(category.name, manufacturer.name)}
                              key={manufacturer.id}
                              className="text-gray-800 text-sm font-medium hover:text-secondary/80 cursor-pointer"
                            >
                              {manufacturer.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {category.subcategories?.map((sub) => (
                        <div key={sub.id} className="w-1/3 p-2">
                          <h3 className="text-secondary">{sub.name}</h3>
                          <ul className="mt-2">
                            {sub.tags.map((tag) => (
                              <li
                                onClick={() =>
                                  handleFindByCategoryAndSubcategoryAndTag(category.name, sub.name, tag.name)
                                }
                                key={tag.id}
                                className="text-gray-800 text-sm font-medium hover:text-secondary/80 cursor-pointer"
                              >
                                {tag.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
