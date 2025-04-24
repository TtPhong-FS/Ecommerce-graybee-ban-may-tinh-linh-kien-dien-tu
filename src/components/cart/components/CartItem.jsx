import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Checkbox, IconButton, styled, Tooltip, tooltipClasses, useMediaQuery } from '@mui/material'
import { Button, Image, Popconfirm } from 'antd'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useToDetail } from '../../../hooks'
import { formattedPrice } from '../../../utils'
import { addItemToCart, clearItemsToCart, decreaseQuantityToCartItem, deleteItemToCart } from '../features/thunk'

const CustomTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    backgroundColor: 'white',
    border: '1px solid lightgray',
    color: 'black'
  }
})

const CartItem = () => {
  const dispatch = useDispatch()

  const mobile = useMediaQuery('(max-width:1024px)')
  const [selectedItems, setSelectedItems] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const toDetail = useToDetail()

  const cartItems = useSelector((state) => state.cart.cartItems)

  const totalItem = cartItems.length

  const handleSelectItem = (cartItemId) => {
    setSelectedItems((prev) =>
      prev.includes(cartItemId) ? prev.filter((id) => id !== cartItemId) : [...prev, cartItemId]
    )
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item.id))
    }
    setSelectAll(!selectAll)
  }

  const handleDecreaseQuantity = (productId, quantity) => {
    const values = { productId, quantity }
    dispatch(decreaseQuantityToCartItem({ request: values }))
  }
  const handleIncreaseQuantity = (productId, quantity) => {
    const values = { productId, quantity }
    dispatch(addItemToCart({ request: values }))
  }

  const handleRemoveItem = (cartItemId) => {
    dispatch(deleteItemToCart({ cartItemId: cartItemId }))
  }

  const handleClearItems = () => {
    dispatch(clearItemsToCart())
  }

  const { setValue } = useFormContext()

  useEffect(() => {
    setValue('cartItemIds', selectedItems)
  }, [selectedItems, setValue])

  return (
    <>
      <div className="flex justify-between items-center bg-white pl-4 py-1 pr-4 rounded-[0.7rem] mb-4">
        <div className="flex items-center gap-2">
          <Checkbox checked={selectAll} onChange={handleSelectAll} />
          <h2>Chọn tất cả ({totalItem})</h2>
        </div>
        <Popconfirm
          title="Xoá giỏ hàng"
          description="Bạn muốn xoá sản phẩm này khỏi giỏ hàng?"
          onConfirm={handleClearItems}
          okText={'Xoá'}
          cancelText={'Huỷ bỏ'}
        >
          <IconButton>
            <DeleteOutlined style={{ fontSize: '1.3rem' }} />
          </IconButton>
        </Popconfirm>
      </div>
      <article className="flex flex-col gap-2 mb-4">
        <>
          <div className="w-auto ">
            {cartItems.map((cartItem, index) => (
              <div key={index}>
                <div className="flex items-center not-first:mt-4 box">
                  <div className="mr-2">
                    <Checkbox
                      checked={selectedItems.includes(cartItem.id)}
                      onChange={() => handleSelectItem(cartItem.id)}
                      value={cartItem.id}
                    />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-3 mr-6">
                      <Image
                        className="border-1 p-2 border-gray-300 rounded-md"
                        style={{ minWidth: 60, minHeight: 65, maxWidth: 60, maxHeight: 65 }}
                        width={60}
                        height={65}
                        src={cartItem.product.thumbnail}
                        alt="Anh san pham"
                      />
                      <Link
                        target="_blank"
                        onClick={() => toDetail({ id: cartItem.product.id, name: cartItem.product.name })}
                        className="cursor-pointer text-sm font-medium max-w-[20rem] decoration-solid text-blue-600 line-clamp-3 hover:underline"
                      >
                        {cartItem.product.name}
                      </Link>
                    </div>
                    <div className="flex mr-2 gap-2 items-center justify-center">
                      <Button
                        icon={<MinusOutlined style={{ fontSize: '0.8rem' }} />}
                        style={{ padding: '1rem' }}
                        disabled={cartItem.quantity === 1 ? true : false}
                        size="small"
                        onClick={() => handleDecreaseQuantity(cartItem.product.id, 1)}
                      />

                      <span className="p-2 text-[1rem]">{cartItem.quantity}</span>
                      <Button
                        icon={<PlusOutlined style={{ fontSize: '0.8rem' }} />}
                        size="small"
                        onClick={() => handleIncreaseQuantity(cartItem.product.id, 1)}
                        style={{ padding: '1rem' }}
                      />
                    </div>
                    <div className="inline-flex w-[8rem] ml-8 flex-col items-start ">
                      <span className="font-medium text-[16px] font-sans text-red-500">
                        {formattedPrice(cartItem.product.finalPrice)}
                      </span>
                      <del className="font-medium text-sm text-gray-500">{formattedPrice(cartItem.product.price)}</del>
                    </div>
                    <div className="ml-4">
                      <Popconfirm
                        title="Xoá giỏ hàng"
                        description="Bạn muốn xoá sản phẩm này khỏi giỏ hàng?"
                        onConfirm={() => handleRemoveItem(cartItem.id)}
                        okText={'Xoá'}
                        cancelText={'Huỷ bỏ'}
                      >
                        <IconButton>
                          <DeleteOutlined style={{ fontSize: '1.3rem' }} />
                        </IconButton>
                      </Popconfirm>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </article>
    </>
  )
}

export default CartItem
