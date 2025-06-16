import CustomDialog from '@/components/custom/CustomDialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useAppContext } from '@/hooks'
import { formattedPrice } from '@/utils'
import { Image } from 'antd'
import { debounce } from 'lodash'
import { Minus, Plus, Trash } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemToCartAsync, clearCartItemsAsync, decreaseQuantityAsync, deleteItemToCartAsync } from '../redux'

export const CartItem = () => {
  const { dispatch } = useAppContext()

  const [selectedItems, setSelectedItems] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const cartItems = useSelector((state) => state.cart.cartItems)

  const totalItem = cartItems?.length

  const handleSelectItem = (currentCartItemId) => {
    setSelectedItems((prev) =>
      prev.includes(currentCartItemId) ? prev.filter((id) => id !== currentCartItemId) : [...prev, currentCartItemId]
    )
  }

  const isAllSelected = selectedItems.length === cartItems.length && cartItems.length > 0

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item.cartItemId))
    }
    setSelectAll(!selectAll)
  }

  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantityAsync(productId))
  }

  const handleAddItemToCart = (productId) => {
    dispatch(addItemToCartAsync(productId))
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

  const [quantity, setQuantity] = useState('1')
  const onChangeQuantity = (e, cartItemId) => {
    const value = Math.max(1, Number(e.target.value))
    setQuantity(value)
    debouncedUpdate(cartItemId, value)
  }

  const debouncedUpdate = useMemo(
    () =>
      debounce((cartItemId, value) => {
        console.log('Update after debounce:', cartItemId, value)
      }, 1000),
    []
  )

  return (
    <>
      <div className="select-none bg-white rounded-md p-2 grid grid-cols-12 mb-4">
        <div className="flex items-center gap-2 py-2 ml-3 col-span-11">
          <Checkbox
            className="mr-3 w-4.5 h-4.5 cursor-pointer"
            checked={isAllSelected}
            onCheckedChange={handleSelectAll}
          />
          <h3>Chọn tất cả ({totalItem})</h3>
        </div>
        <div className="flex items-center justify-center cursor-pointer col-span-1">
          <CustomDialog
            triggerElement={<Trash className=" text-muted-foreground" size={16} />}
            title="Xoá tất cả mặt hàng"
            description="Bạn có chắc chắn muốn xoá tất cả không?"
            titleCancel="Huỷ xoá"
            titleOk="Tiếp tục xoá"
            onConfirm={handleClearItems}
          />
        </div>
      </div>
      <div className="w-auto flex flex-col gap-4">
        {cartItems.map((cartItem, index) => (
          <div key={index}>
            <div className="flex items-center not-first:mt-4 card">
              <div className="mr-6 select-none">
                <Checkbox
                  className="w-4.5 h-4.5 cursor-pointer"
                  checked={selectedItems.includes(cartItem.cartItemId)}
                  onCheckedChange={() => handleSelectItem(cartItem.cartItemId)}
                  value={cartItem.cartItemId}
                />
              </div>
              <div className="select-none grid grid-cols-3 place-items-center place-content-center">
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
                    onClick={() => handleDecreaseQuantity(cartItem.product.id)}
                  >
                    <Minus size={16} />
                  </Button>

                  <Input
                    type="number"
                    className="select-none p-2 text-xs max-w-20 h-8"
                    min={1}
                    value={quantity}
                    onChange={(e) => onChangeQuantity(e)}
                  />

                  <Button
                    className="w-8 h-8 cursor-pointer"
                    variant="outline"
                    onClick={() => handleAddItemToCart(cartItem.product.id)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="grid grid-cols-7 place-items-center w-full">
                  <div className="flex flex-col justify-start col-span-6">
                    <span className="font-medium text-sm lg:text-base font-sans text-red-500">
                      {formattedPrice(cartItem.product.finalPrice)}
                    </span>
                    <del className="font-medium text-xs lg:text-sm text-gray-500">
                      {formattedPrice(cartItem.product.price)}
                    </del>
                  </div>
                  <div className="cursor-pointer col-span-1">
                    <CustomDialog
                      triggerElement={<Trash className=" text-muted-foreground" size={16} />}
                      title="Xoá mặt hàng"
                      description="Bạn có chắc chắn muốn xoá mục này không?"
                      titleCancel="Huỷ xoá"
                      titleOk="Tiếp tục xoá"
                      onConfirm={() => handleRemoveItem(cartItem.cartItemId)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
