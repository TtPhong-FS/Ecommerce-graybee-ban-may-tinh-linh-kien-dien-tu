import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { SIDEBAR_DRAWER_FOOTER_ICON } from '@/constants'
import { useMediaQuery } from '@mui/material'
import { ChevronDown, ChevronRight, X } from 'lucide-react'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from './ui/collapsible'
export const Sidebar = ({
  openSidebar,
  setOpenSidebar,
  isMegaMenuVisible,
  setIsMegaMenuVisible
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const sidebar = useSelector((state) => state.home.sidebar)
  const sidebarMemo = useMemo(() => sidebar, [sidebar])

  return isMobile ? (
    <DropSidebar
      openSidebar={openSidebar}
      categories={sidebarMemo}
      setOpenSidebar={setOpenSidebar}
    />
  ) : (
    <div className={`${openSidebar && 'sticky top-25 z-40'} h-full `}>
      {openSidebar && (
        <div
          className='fixed inset-0 bg-foreground opacity-70'
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}
      <div className='z-40 relative '>
        <MegaSidebar
          setIsMegaMenuVisible={setIsMegaMenuVisible}
          isMegaMenuVisible={isMegaMenuVisible}
          categories={sidebarMemo}
          setOpenSidebar={setOpenSidebar}
        />
      </div>
    </div>
  )
}

Sidebar.propTypes = {
  openSidebar: PropTypes.bool,
  setOpenSidebar: PropTypes.func,
  isMegaMenuVisible: PropTypes.bool,
  setIsMegaMenuVisible: PropTypes.func
}

const MegaSidebar = ({
  categories,
  setOpenSidebar,
  isMegaMenuVisible,
  setIsMegaMenuVisible
}) => {
  const [activeCategory, setActiveCategory] = useState(null)

  const handleMouseEnter = (cat) => {
    setActiveCategory(cat)
    setIsMegaMenuVisible(true)
  }

  return (
    <div className='relative w-full'>
      <div className='flex gap-2  overflow-hidden '>
      {/* Sidebar */}
        <ul className='max-w-[200px] w-[200px] max-h-[460px] h-[460px] bg-white overflow-y-scroll rounded-xs hide-scrollbar'>
        {categories.map((cat, index) => (
          <Link
            to={`/collections/${cat.slug || '#'}`}
            key={index}
            onClick={() => setOpenSidebar(false)}
            onMouseEnter={() => handleMouseEnter(cat)}
              className='flex relative text-[13px] font-semibold items-center justify-between p-2 text-gray-800 hover:bg-secondary/90 hover:text-primary-foreground cursor-pointer '
          >
            {cat.name}
            <ChevronRight size={12} />
          </Link>
        ))}
      </ul>

      {/* Mega Menu */}

      {isMegaMenuVisible && activeCategory?.children?.length > 0 && (
          <div className='absolute top-0 left-[200px] z-50 ml-2 w-[980px] max-w-[980px] bg-white h-full max-h-[460px] px-6 py-4 grid grid-cols-4 gap-4 overflow-hidden rounded-xs'>
          {activeCategory.children.map((column, index) => {
            return (
              <div key={index}>
                  <h4 className='font-bold text-red-600 text-sm mb-2'>
                    {column.name}
                  </h4>
                  <ul className='space-y-1'>
                  {column.children.map((child, index) => (
                    <Link
                      onClick={() => setOpenSidebar(false)}
                        to={`/collections/${
                          child.slug === null || child.slug === ''
                            ? activeCategory.slug
                            : child.slug
                        }`}
                      key={index}
                        className='text-sm flex flex-col gap-2 text-gray-700 hover:text-red-600 cursor-pointer'
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
    </div>
  )
}

MegaSidebar.propTypes = {
  categories: PropTypes.array,
  setOpenSidebar: PropTypes.func,
  isMegaMenuVisible: PropTypes.bool,
  setIsMegaMenuVisible: PropTypes.func
}

const DropSidebar = ({ openSidebar, categories, setOpenSidebar }) => {
  const [activeCategory, setActiveCategory] = useState(null)

  const handleDropDown = (c) => {
    setActiveCategory((prev) => (prev?.slug === c.slug ? null : c))
  }

  return (
    <>
      <Drawer open={openSidebar} onOpenChange={setOpenSidebar} direction='left'>
        <DrawerTrigger className='hidden' />
        <DrawerContent>
          <DrawerHeader className='p-0'>
            <DrawerTitle className='bg-secondary flex justify-between items-center px-3'>
              <h5 className='font-bold text-secondary-foreground uppercase py-3 max-md:text-base'>
                Danh mục sản phẩm
              </h5>
              <DrawerClose asChild>
                <Button
                  onClick={() => setActiveCategory(null)}
                  variant='icon'
                  className='text-white cursor-pointer'
                >
                  <X />
                </Button>
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription className='hidden' />
          </DrawerHeader>
          <div className='px-4 overflow-y-auto max-h-[calc(100vh-100px)]'>
            {categories.map((c) => (
              <Collapsible key={c.slug} open={activeCategory?.slug === c.slug}>
                <CollapsibleTrigger className="group/collapsible p-2 w-full" asChild>
                  <div className="flex w-full justify-between">
                    <Link
                      onClick={() => setOpenSidebar(false)}
                      to={`/collections/${c.slug || '#'}`}
                      className="w-full text-sm hover:text-blue-600 "
                    >
                      {c.name}
                    </Link>
                    <ChevronDown
                      size={16}
                      strokeWidth={2.5}
                      onClick={() => handleDropDown(c)}
                      className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180 hover:text-blue-600 font-bold cursor-pointer"
                    />
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-4 flex flex-col gap-4 mt-1 mb-4">
                    {c.children?.map((sub) => (
                      <div key={sub.name}>
                        <h4 className="font-bold text-red-600 text-sm mb-1">{sub.name}</h4>
                        <ul className="flex flex-col gap-1">
                          {sub.children.map((child) => (
                            <Link
                              onClick={() => setOpenSidebar(false)}
                              to={`/collections/${child.slug || c.slug}`}
                              key={child.name}
                              className="text-sm flex flex-col gap-2 text-gray-700 hover:text-red-600 cursor-pointer"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
          <DrawerFooter className="p-0">
            <div className="flex gap-1 bg-secondary">
              {SIDEBAR_DRAWER_FOOTER_ICON.map((item) => (
                <Link
                  onClick={() => setOpenSidebar(false)}
                  className="w-1/4  p-4 place-items-center "
                  key={item.id}
                  to={item.path}
                >
                  <item.icon className="text-primary-foreground hover:text-red-400" />
                </Link>
              ))}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

DropSidebar.propTypes = {
  openSidebar: PropTypes.bool,
  categories: PropTypes.array,
  setOpenSidebar: PropTypes.func
}
