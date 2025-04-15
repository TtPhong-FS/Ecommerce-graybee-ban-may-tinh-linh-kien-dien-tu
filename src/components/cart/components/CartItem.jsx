import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Checkbox, IconButton, styled, Tooltip, tooltipClasses, useMediaQuery } from '@mui/material'
import { Button, Image, Popconfirm } from 'antd'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from '../../../utils'
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
  console.log('render')
  const dispatch = useDispatch()
  const token = getToken()
  const mobile = useMediaQuery('(max-width:1024px)')
  const [selectedItems, setSelectedItems] = useState([])
  const [selectAll, setSelectAll] = useState(false)

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

  const handleDecreaseQuantity = async (productId, quantity) => {
    const values = { productId, quantity }
    dispatch(decreaseQuantityToCartItem({ request: values, token: token }))
  }
  const handleIncreaseQuantity = (productId, quantity) => {
    const values = { productId, quantity }
    dispatch(addItemToCart({ request: values, token: token }))
  }

  const handleRemoveItem = (cartItemId) => {
    dispatch(deleteItemToCart({ cartItemId: cartItemId, token: token }))
  }

  const handleClearItems = () => {
    dispatch(clearItemsToCart({ token: token }))
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
          <h2 className="select-text">Chọn tất cả ({totalItem})</h2>
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
          {mobile ? (
            <CustomTooltip
              arrow
              placement="auto"
              title={
                <div className="w-auto">
                  {cartItems.map((cartItem, index) => (
                    <div key={index} className="flex items-center not-first:pt-4 box">
                      <div className="mr-2">
                        <Checkbox
                          checked={selectedItems.includes(cartItem.id)}
                          onChange={() => handleSelectItem(cartItem.id)}
                          value={cartItem.id}
                        />
                      </div>
                      <div className="flex items-center gap-3 mr-1">
                        {mobile ? null : (
                          <Image
                            className="border-1  border-gray-300 rounded-md"
                            style={{ minWidth: 60, minHeight: 65, maxWidth: 60, maxHeight: 65 }}
                            width={60}
                            height={65}
                            src={cartItem.product.thumbnail}
                            alt="Anh san pham"
                          />
                        )}
                        <p className="text-sm font-medium w-[12rem]">{cartItem.product.name}</p>
                      </div>
                      <div className="flex ml-4 mr-4 gap-2 items-center justify-center">
                        <Button
                          disabled={cartItem.quantity <= 1 ? true : false}
                          size="small"
                          onClick={() => handleDecreaseQuantity(cartItem.product.id, 1)}
                        >
                          <span className="text-[1.5rem]">-</span>
                        </Button>
                        <span className="p-2 text-[1rem]">{cartItem.quantity}</span>
                        <Button
                          size="small"
                          onClick={() => handleIncreaseQuantity(cartItem.product.id, 1)}
                          className=""
                        >
                          <span className="text-[1.5rem]">+</span>
                        </Button>
                      </div>
                      <div className="inline-flex w-[8rem] ml-4 flex-col items-start ">
                        <span className="font-medium text-[16px] font-sans text-red-500">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            cartItem.product.finalPrice
                          )}
                        </span>
                        <del className="font-medium text-sm text-gray-500">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                            cartItem.product.price
                          )}
                        </del>
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
                  ))}
                </div>
              }
            >
              <span className="font-medium box cursor-pointer">Chạm để xem sản phẩm</span>
            </CustomTooltip>
          ) : (
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
                    <div className="flex items-center gap-3 mr-6">
                      <Image
                        className="border-1 p-2 border-gray-300 rounded-md"
                        style={{ minWidth: 60, minHeight: 65, maxWidth: 60, maxHeight: 65 }}
                        width={60}
                        height={65}
                        src={cartItem.product.thumbnail}
                        alt="Anh san pham"
                      />
                      <p className="text-sm font-medium w-[16rem]">{cartItem.product.name}</p>
                    </div>
                    <div className="flex mr-2 gap-2 items-center justify-center">
                      <Button
                        icon={<MinusOutlined style={{ fontSize: '0.8rem' }} />}
                        style={{ padding: '1rem' }}
                        disabled={cartItem.quantity <= 1 ? true : false}
                        size="small"
                        onClick={() => handleDecreaseQuantity(cartItem.id, cartItem.product.id, 1)}
                      />

                      <span className="p-2 text-[1rem]">{cartItem.quantity}</span>
                      <Button
                        icon={<PlusOutlined style={{ fontSize: '0.8rem' }} />}
                        size="small"
                        onClick={() => handleIncreaseQuantity(cartItem.product.id, 1)}
                        style={{ padding: '1rem' }}
                      />
                    </div>
                    <span className="inline-flex w-[8rem] ml-8 flex-col items-start ">
                      <span className="font-medium text-[16px] font-sans text-red-500">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                          cartItem.product.finalPrice
                        )}
                      </span>
                      <del className="font-medium text-sm text-gray-500">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                          cartItem.product.price
                        )}
                      </del>
                    </span>
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
              ))}
            </div>
          )}
        </>
      </article>
    </>
  )
}

export default CartItem
