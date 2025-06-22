import { Spin } from 'antd'
import PropTypes from 'prop-types'

import { shallowEqual, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { formattedPrice } from '../../utils/format'
import { ScrollArea } from '../ui/scroll-area'

export const ProductSearchCard = ({ loading, setIsSearch }) => {
  const products = useSelector((state) => state.product.search, shallowEqual)

  return (
    <ScrollArea className="h-96 w-full rounded-md border bg-white">
      <div className="p-4">
        <Spin spinning={loading} style={{ height: '30rem' }}>
          <div className="rounded-md flex flex-col ">
            {products?.map((product, index) => (
              <div key={index} className="flex items-center gap-2 border-b-1 border-gray-300 py-3">
                <div className="cursor-pointer border-1 border-gray-300 rounded-md p-1">
                  <img className="max-w-[50px] max-h-[60px] h-[50px]" src={product?.thumbnail} alt={product?.name} />
                </div>
                <div>
                  <div className="cursor-pointer">
                    <Link
                      onClick={() => setIsSearch(false)}
                      to={`/products/${product?.slug}`}
                      className="font-medium text-[12.8px] hover:underline decoration-solid text-blue-600"
                    >
                      {product?.name}
                    </Link>
                  </div>
                  <span className="inline-block">
                    <del className="font-medium text-[11px] text-gray-500">{formattedPrice(product?.price)}</del>
                    <span className="font-medium text-[12.8px]  ml-1 text-red-500 ">
                      {formattedPrice(product?.finalPrice)}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Spin>
      </div>
    </ScrollArea>
  )
}

ProductSearchCard.propTypes = {
  loading: PropTypes.bool,
  setIsSearch: PropTypes.func
}
