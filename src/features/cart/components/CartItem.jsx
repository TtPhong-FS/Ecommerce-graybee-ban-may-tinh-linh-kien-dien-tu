import CustomDialog from '@/components/custom/CustomDialog'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useAppContext } from '@/hooks'
import { handleAsync } from '@/lib'
import { formattedPrice } from '@/utils'
import { Image, Spin } from 'antd'
import { debounce } from 'lodash'
import { Minus, Plus, Trash } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import {
  addItemToCartAsync,
  clearCartItemsAsync,
  decreaseQuantityAsync,
  deleteItemToCartAsync,
  updateQuantityAsync
} from '../redux'
import { updateQuantity } from '../redux/cartSlice'
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

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

  const handleDecreaseQuantity = async (productId) => {
    setIsUpdate(true)
    dispatch(decreaseQuantityAsync(productId))
    await sleep(1000)
    setIsUpdate(false)
  }

  const handleAddItemToCart = async (productId) => {
    setIsUpdate(true)
    dispatch(addItemToCartAsync(productId))
    await sleep(1000)
    setIsUpdate(false)
  }

  const handleRemoveItem = (cartItemId) => {
    handleAsync({
      asyncAction: (cartItemId) => dispatch(deleteItemToCartAsync(cartItemId)).unwrap(),
      onSuccess: (res) => {
        toast.success(res.data.message)
      },
      values: cartItemId,
      toast
    })
  }

  const handleClearItems = () => {
    dispatch(clearCartItemsAsync())
  }

  const { setValue } = useFormContext()

  useEffect(() => {
    setValue('cartItemIds', selectedItems)
  }, [selectedItems, setValue])

  const [isUpdate, setIsUpdate] = useState(false)

  const onChangeQuantity = async (e, cartItemId) => {
    const value = Math.max(1, Number(e.target.value))
    dispatch(updateQuantity({ cartItemId: cartItemId, quantity: value }))
    setIsUpdate(true)
    debouncedUpdate(cartItemId, value)
  }

  const debouncedUpdate = useMemo(
    () =>
      debounce(async (cartItemId, value) => {
        await handleAsync({
          asyncAction: ({ cartItemId, value }) =>
            dispatch(updateQuantityAsync({ cartItemId: cartItemId, quantity: value })).unwrap(),
          onSuccess: (res) => {
            toast.success(res.message)
          },
          values: { cartItemId, value }
        })
        setIsUpdate(false)
      }, 1000),
    []
  )

  return (
    <>
      <Spin spinning={isUpdate}>
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
          {cartItems.map((cartItem) => (
            <div key={cartItem.cartItemId} className="card flex items-center max-md:flex-col justify-between gap-6">
              <div className="flex items-center not-first:mt-4 w-full">
                <div className="mr-6 select-none ">
                  <Checkbox
                    className="w-4.5 h-4.5 cursor-pointer"
                    checked={selectedItems.includes(cartItem.cartItemId)}
                    onCheckedChange={() => handleSelectItem(cartItem.cartItemId)}
                    value={cartItem.cartItemId}
                  />
                </div>
                <div className="select-none flex items-center w-full">
                  <div className="flex items-center gap-3 mr-6">
                    <Image
                      className="border-1 p-2 border-gray-300 rounded-md"
                      style={{ minWidth: 60, minHeight: 65, maxWidth: 60, maxHeight: 65 }}
                      width={60}
                      height={65}
                      src={cartItem.product.thumbnail}
                      alt="Anh san pham"
                    />
                  </div>
                  <div className="flex items-center justify-between lg:w-[350px]">
                    <div className="flex max-md:flex-col gap-2 w-full">
                      <Link
                        to={`/products/${cartItem?.product?.slug}`}
                        className="cursor-pointer text-base max-md:text-sm font-medium max-w-[16rem] link line-clamp-2"
                      >
                        {cartItem.product.name}
                      </Link>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm max-md:text-xs font-sans text-red-500">
                          {formattedPrice(cartItem.product.finalPrice)}
                        </span>
                        <del className="font-medium text-sm max-md:text-xs text-gray-500">
                          {formattedPrice(cartItem.product.price)}
                        </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between lg:w-[427px] max-md:gap-6">
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
                    value={cartItem.quantity}
                    onChange={(e) => onChangeQuantity(e, cartItem.cartItemId)}
                  />

                  <Button
                    className="w-8 h-8 cursor-pointer"
                    variant="outline"
                    onClick={() => handleAddItemToCart(cartItem.product.id)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="cursor-pointer w-4.5">
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
          ))}
        </div>
      </Spin>
    </>
  )
}
