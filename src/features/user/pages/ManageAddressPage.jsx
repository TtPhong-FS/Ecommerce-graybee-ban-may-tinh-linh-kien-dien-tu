import { HomeFilled } from '@ant-design/icons'

import { Button } from '@/components/ui/button'
import { useLoading } from '@/hooks'
import { handleAsync } from '@/lib'
import { Chip } from '@mui/material'
import { Avatar, Drawer } from 'antd'
import { LoaderCircle, Trash } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { useAddressData } from '../data'
import { AddressProvider } from '../form/address'
import {
  deleteAddressByIdAndUserUidFromTokenAsync,
  fetchAddressesByTokenAsync,
  updateDefaultAddressAsync
} from '../redux'

export const ManageAddressPage = () => {
  const { deliveryAddress } = useAddressData()

  const { isLoading, start, stop } = useLoading()

  const [open, setOpen] = useState(false)

  const [initialData, setInitialData] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const showDrawer = () => {
    setVisible(true)
    setOpen(true)
  }

  const onUpdate = (record) => {
    setVisible(true)
    setIsUpdate(true)
    setInitialData(record)
    setOpen(true)
  }

  const onClose = () => {
    setVisible(false)
    setIsUpdate(false)
    setInitialData(null)
    setOpen(false)
  }

  const handleDeleteAddressById = async (id) => {
    await handleAsync({
      asyncAction: (id) => dispatch(deleteAddressByIdAndUserUidFromTokenAsync(id)).unwrap(),
      onSuccess: (res) => {
        toast.success(res.message)
      },
      toast,
      values: id,
      loadingKey: `delete:${id}`,
      startLoading: start,
      stopLoading: stop
    })
  }

  const handleSetDefailtAddress = async (id) => {
    await handleAsync({
      asyncAction: (id) => dispatch(updateDefaultAddressAsync(id)).unwrap(),
      onSuccess: (res) => {
        toast.success(res.message)
      },
      toast,
      values: id,
      loadingKey: `updateDefault:${id}`,
      startLoading: start,
      stopLoading: stop
    })
  }

  const handleReloadAddress = async () => {
    await handleAsync({
      asyncAction: () => dispatch(fetchAddressesByTokenAsync()).unwrap(),
      toast,
      loadingKey: 'reload',
      startLoading: start,
      stopLoading: stop,
      onSuccess: (res) => {
        toast.success(res.message)
      }
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center py-3 pb-6">
        <h1 className="select-text">Địa chỉ cá nhân</h1>

        <div className="flex justify-between items-center gap-6">
          <Button
            variant="outline"
            className="select-none h-[38px] cursor-pointer "
            type="button"
            disabled={isLoading('reload')}
            onClick={handleReloadAddress}
          >
            {isLoading('reload') ? (
              <span className="flex items-center">
                <LoaderCircle className="animate-spin mr-2" />
                Đang tải
              </span>
            ) : (
              'Làm mới'
            )}
          </Button>
          <Button
            variant="secondary"
            className="select-none h-[38px] cursor-pointer"
            onClick={showDrawer}
            type="button"
          >
            Thêm địa chỉ
          </Button>
        </div>
      </div>
      {deliveryAddress.length > 0 ? (
        <div>
          {deliveryAddress.map((address) => (
            <div key={address?.id} className="box flex items-center justify-between not-last:mb-6 text-sm">
              <div className="flex flex-4 gap-2 items-center select-text">
                <div>
                  <Avatar size={48} style={{ backgroundColor: '#ffcbcb', color: '#dc2f2f' }} icon={<HomeFilled />} />
                </div>
                <div className="">
                  <div className="flex items-center gap-2 text-[#090d14] h-[2.3rem]">
                    <span className="sub-title">{address?.fullName}</span>
                    <span className="text-gray-400">|</span>
                    <span className="font-normal">{address?.phoneNumber}</span>
                    {address?.default ? (
                      <Chip label="Mặc định" style={{ backgroundColor: '#ffcbcb', fontSize: '1rem' }} />
                    ) : null}
                  </div>
                  <div className="max-w-[25rem] ">{address?.streetAddress}</div>
                </div>
              </div>
              <div className="flex flex-2 items-center gap-4 justify-between">
                <span onClick={() => onUpdate(address)} className="cursor-pointer text-error">
                  Sửa
                </span>
                <span
                  onClick={() => handleSetDefailtAddress(address?.id)}
                  className={`${
                    isLoading(`updateDefault:${address?.id}`) ? 'pointer-events-none' : 'cursor-pointer '
                  } text-error`}
                >
                  Chọn làm mặc định
                </span>
                <span
                  className={`${
                    isLoading(`delete:${address?.id}`) ? 'pointer-events-none' : 'cursor-pointer '
                  } hover:bg-muted-foreground/10 w-8 h-8 rounded-full place-items-center place-content-center  `}
                  onClick={() => handleDeleteAddressById(address?.id)}
                >
                  <Trash size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-sm rounded-md text-center select-none bg-primary-foreground text-muted-foreground">
          Chưa có địa chỉ cá nhân nào!
        </div>
      )}
      {visible && (
        <Drawer
          styles={{ body: { padding: 0 } }}
          style={{ backgroundColor: '#eeeeee' }}
          closeIcon={null}
          open={open}
          onClose={onClose}
        >
          <AddressProvider isUpdate={isUpdate} initialData={initialData} onClose={onClose} />
        </Drawer>
      )}
    </div>
  )
}
