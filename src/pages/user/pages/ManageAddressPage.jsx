import { HomeFilled } from '@ant-design/icons'
import { DeleteOutline } from '@mui/icons-material'
import { Chip, IconButton } from '@mui/material'
import { Avatar, Button, Drawer, Spin } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleAsync } from '../../../components/func'
import { useNotification } from '../../../hooks'
import { AddressProvider } from '../components/AddressProvider'
import useAddressData from '../components/data/useAddressData'
import { deleteAddressByIdAndUserUidFromToken, getAddressesByToken, updateDefaultAddress } from '../features'

export const ManageAddressPage = () => {
  const { deliveryAddress, loading } = useAddressData()

  const [open, setOpen] = useState(false)

  const [initialData, setInitialData] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)
  const [visible, setVisible] = useState(false)
  const { openNotificationWithIcon, contextHolder } = useNotification()

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
        openNotificationWithIcon('success', 'Thành công', res.message)
      },
      openNotificationWithIcon,
      values: id
    })
  }

  const handleSetDefailtAddress = async (id) => {
    await handleAsync({
      asyncAction: (id) => dispatch(updateDefaultAddress({ id: id })).unwrap(),
      onSuccess: (res) => {
        openNotificationWithIcon('success', 'Thành công', res.message)
      },
      openNotificationWithIcon,
      values: id
    })
  }

  const handleReloadAddress = async () => {
    await handleAsync({
      asyncAction: () => dispatch(getAddressesByToken()).unwrap(),
      openNotificationWithIcon
    })
  }

  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h1>Địa chỉ cá nhân</h1>
          <div className="ml-12">
            <Button
              loading={loading}
              style={{ height: '2.7rem' }}
              type="default"
              htmlType="button"
              disabled={loading}
              onClick={handleReloadAddress}
            >
              {loading ? 'Đang  tải' : 'Làm mới'}
            </Button>
          </div>
        </div>
        <div className="flex content-center items-center gap-6 mb-6">
          <Button
            disabled={loading}
            onClick={() => showDrawer()}
            type="primary"
            htmlType="button"
            style={{ height: '2.7rem', backgroundColor: '#dc2f2f' }}
          >
            Thêm địa chỉ
          </Button>
        </div>
      </div>

      <Spin spinning={loading}>
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
                <IconButton disabled={loading} onClick={() => handleDeleteAddressById(address?.id)}>
                  <DeleteOutline />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
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
      </Spin>
    </div>
  )
}
