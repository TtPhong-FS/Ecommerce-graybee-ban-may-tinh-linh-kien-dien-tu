import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { useAppContext } from '@/hooks'
import { formattedPrice } from '@/utils'
import { Image, Popconfirm } from 'antd'
import { Minus, Plus, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCartAsync, clearCartItemsAsync, decreaseQuantityAsync, deleteItemToCartAsync } from '../redux'

export const CartItem = () => {
  const { dispatch } = useAppContext()

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

  const handleDecreaseQuantity = (productId, quantity) => {
    const values = { productId, quantity }
    dispatch(decreaseQuantityAsync(values))
  }

  const handleAddItemToCart = (productId, quantity) => {
    const values = { productId, quantity }
    dispatch(addItemToCartAsync(values))
  }

  const handleRemoveItem = (cartItemId) => {
    dispatch(deleteItemToCartAsync(cartItemId))
  }

  const handleClearItems = () => {
    dispatch(clearCartItemsAsync())
  }

  const { setValue } = useFormContext()

  useEffect(() => {
    setValue('cartItemIds', selectedItems)
  }, [selectedItems, setValue])

  return (
    <>
      <div className="select-none flex justify-between items-center bg-white pl-4 py-1 pr-4 rounded-[0.7rem] mb-4">
        <div className="flex items-center gap-2 py-2">
          <Checkbox className="mr-4 w-4.5 h-4.5 cursor-pointer" checked={selectAll} onCheckedChange={handleSelectAll} />
          <h3>Chọn tất cả ({totalItem})</h3>
        </div>
        <div className="flex items-center justify-center ml-4 w-8 h-8 hover:bg-background rounded-full cursor-pointer">
          <Popconfirm
            title="Xoá giỏ hàng"
            description="Bạn muốn xoá sản phẩm này khỏi giỏ hàng?"
            onConfirm={handleClearItems}
            okText="Xoá"
            cancelText="Huỷ bỏ"
          >
            <Trash className=" text-muted-foreground" size={16} />
          </Popconfirm>
        </div>
      </div>
      <div className="w-auto flex flex-col gap-4">
        {cartItems.map((cartItem, index) => (
          <div key={index}>
            <div className="flex items-center not-first:mt-4 box">
              <div className="mr-6 select-none">
                <Checkbox
                  className="w-4.5 h-4.5 cursor-pointer"
                  checked={selectedItems.includes(cartItem.id)}
                  onCheckedChange={() => handleSelectItem(cartItem.id)}
                  value={cartItem.id}
                />
              </div>
              <div className="select-none flex justify-between items-center w-full">
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
                    to={`/products/${cartItem?.product?.slug}`}
                    className="cursor-pointer text-xs md:text-sm font-medium max-w-[20rem] link line-clamp-2"
                  >
                    {cartItem.product.name}
                  </Link>
                </div>
                <div className="flex mr-2 gap-2 items-center justify-center">
                  <Button
                    variant="outline"
                    className="w-8 h-8 cursor-pointer"
                    disabled={cartItem.quantity === 1 ? true : false}
                    onClick={() => handleDecreaseQuantity(cartItem.product.id, 1)}
                  >
                    <Minus size={16} />
                  </Button>

                  <span className="select-none p-2 text-xs">{cartItem.quantity}</span>
                  <Button
                    className="w-8 h-8 cursor-pointer"
                    variant="outline"
                    onClick={() => handleAddItemToCart(cartItem.product.id, 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="inline-flex w-[8rem] ml-8 flex-col items-start ">
                  <span className="font-medium text-xs md:text-sm font-sans text-red-500">
                    {formattedPrice(cartItem.product.finalPrice)}
                  </span>
                  <del className="font-medium text-[0.65rem] md:text-[0.8rem] text-gray-500">
                    {formattedPrice(cartItem.product.price)}
                  </del>
                </div>
                <div className="flex items-center justify-center ml-4 w-10 h-8 hover:bg-background rounded-full cursor-pointer">
                  <Popconfirm
                    title="Xoá giỏ hàng"
                    description="Bạn muốn xoá sản phẩm này khỏi giỏ hàng?"
                    onConfirm={() => handleRemoveItem(cartItem.id)}
                    okText={'Xoá'}
                    cancelText={'Huỷ bỏ'}
                  >
                    <span className=" ">
                      <Trash className=" text-muted-foreground" size={16} />
                    </span>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
