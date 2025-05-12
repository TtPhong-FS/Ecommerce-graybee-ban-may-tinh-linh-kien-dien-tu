import { HomeFilled } from '@ant-design/icons'

import { Button } from '@/components/ui/button'
import useLoading from '@/hooks/useLoading'
import { Chip, IconButton } from '@mui/material'
import { Avatar, Drawer } from 'antd'
import { Delete, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { handleAsync } from '../../../components/func'
import { AddressProvider } from '../components/AddressProvider'
import useAddressData from '../components/data/useAddressData'
import { deleteAddressByIdAndUserUidFromToken, getAddressesByToken, updateDefaultAddress } from '../features'

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
      asyncAction: (id) => dispatch(deleteAddressByIdAndUserUidFromToken({ id: id })).unwrap(),
      onSuccess: (res) => {
        toast.success(res.message)
      },
      toast,
      values: id
    })
  }

  const handleSetDefailtAddress = async (id) => {
    await handleAsync({
      asyncAction: (id) => dispatch(updateDefaultAddress({ id: id })).unwrap(),
      onSuccess: (res) => {
        toast.success(res.message)
      },
      toast,
      values: id
    })
  }

  const handleReloadAddress = async () => {
    await handleAsync({
      asyncAction: () => dispatch(getAddressesByToken()).unwrap(),
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
      <div className="flex justify-between items-center">
        <div className="flex items-center py-3 pb-6">
          <h1>Địa chỉ cá nhân</h1>
          <div className="ml-12">
            <Button
              variant="secondary"
              className="select-none h-[38px] cursor-pointer"
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
          </div>
        </div>
        <div className="flex content-center items-center gap-6">
          <Button className="select-none h-[38px] cursor-pointer" onClick={() => showDrawer()} type="button">
            Thêm địa chỉ
          </Button>
        </div>
      </div>
      {deliveryAddress.length > 0 ? (
        <div>
          {deliveryAddress.map((address) => (
            <div key={address?.id} className="box flex items-center justify-between not-last:mb-6">
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
                <span onClick={() => onUpdate(address)} className="cursor-pointer text-[#dc2f2f]">
                  Sửa
                </span>
                <span onClick={() => handleSetDefailtAddress(address?.id)} className="cursor-pointer text-[#dc2f2f]">
                  Chọn làm mặc định
                </span>
                <IconButton
                  disabled={isLoading(`delete:${address?.id}`)}
                  onClick={() => handleDeleteAddressById(address?.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-md text-center select-none bg-white text-muted-foreground">
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
