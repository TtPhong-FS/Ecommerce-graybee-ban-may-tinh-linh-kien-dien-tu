import { CarouselWrapper } from '@/features/carousels'
import ProductCategories from '@/features/product/components/ProductCategories'
import Promotions from '@/features/product/components/Promotions'
import { useAppContext } from '@/hooks'
import { unFocusSidebar } from '@/store/redux/homeSlice'
import { useEffect } from 'react'

export const HomePage = () => {
  const { dispatch } = useAppContext()

  useEffect(() => {
    return () => {
      dispatch(unFocusSidebar())
    }
  }, [])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <CarouselWrapper category={'Laptop'} />
        <CarouselWrapper category={'Pc Gaming'} />
        <CarouselWrapper category={'Cpu'} />
        <CarouselWrapper category={'Ram'} />
        <CarouselWrapper category={'Màn hình'} />
        <CarouselWrapper category={'Vga'} />
      </div>
      <div className="flex flex-col gap-4">
        <ProductCategories />
        <Promotions />
      </div>
    </div>
  )
}
