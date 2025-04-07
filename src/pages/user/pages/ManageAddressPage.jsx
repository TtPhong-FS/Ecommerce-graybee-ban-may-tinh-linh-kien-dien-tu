import { HomeFilled, LoadingOutlined, RedoOutlined } from '@ant-design/icons'
import { DeleteOutline } from '@mui/icons-material'
import { Chip, IconButton } from '@mui/material'
import { Avatar, Button, Drawer } from 'antd'
import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { useMessage } from '../../../hooks'
import { getToken } from '../../../utils'
import { AddressProvider } from '../components/AddressProvider'
import { deleteAddressByIdAndUserUidFromToken, getAddressesByToken, updateDefaultAddress } from '../features'
const personalAddress = [
  {
    id: 1,
    fullname: 'Nguyễn Thị Bích Ngọc',
    phoneNumber: '0343646044',
    city: 'Hà Nội',
    district: 'Huyện Thường Tín',
    commune: 'Xã Vân Tảo',
    streetAddress: 'Số 65 Xóm Đoàn kết Thôn Xâm động',
    default: true
  },
  {
    id: 2,
    fullname: 'Nguyễn Thị Bích Ngọc',
    phoneNumber: '0343646044',
    city: 'Hà Nội',
    district: 'Huyện Thường Tín',
    commune: 'Xã Vân Tảo',
    streetAddress: 'Số 65 Xóm Đoàn kết Thôn Xâm động',
    default: false
  },
  {
    id: 3,
    fullname: 'Nguyễn Thị Bích Ngọc',
    phoneNumber: '0343646044',
    city: 'Hà Nội',
    district: 'Huyện Thường Tín',
    commune: 'Xã Vân Tảo',
    streetAddress: 'Số 65 Xóm Đoàn kết Thôn Xâm động',
    default: false
  },
  {
    id: 4,
    fullname: 'Nguyễn Thị Bích Ngọc',
    phoneNumber: '0343646044',
    city: 'Hà Nội',
    district: 'Huyện Thường Tín',
    commune: 'Xã Vân Tảo',
    streetAddress: 'Số 65 Xóm Đoàn kết Thôn Xâm động',
    default: false
  }
]

export const ManageAddressPage = () => {
  const deliveryAddress = useSelector((state) => state.account.deliveryAddress, shallowEqual)

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const [isUpdate, setIsUpdate] = useState(false)
  const [visible, setVisible] = useState(false)
  const { messageApi, contextHolder } = useMessage()

  const token = getToken()
  const dispatch = useDispatch()

  const showDrawer = (record = null) => {
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
    try {
      setLoading(true)
      const response = await dispatch(deleteAddressByIdAndUserUidFromToken({ id: id, token: token })).unwrap()
      if (response.status === 200) {
        messageApi.success(response.message)
        setLoading(false)
      }
    } catch (error) {
      if (error && typeof error === 'object') {
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.warning(error.unconnect)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSetDefailtAddress = async (id) => {
    try {
      setLoading(true)
      const response = await dispatch(updateDefaultAddress({ id: id, token: token })).unwrap()
      if (response.status === 200) {
        messageApi.success(response.message)
        setLoading(false)
      }
    } catch (error) {
      if (error && typeof error === 'object') {
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.warning(error.unconnect)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const handleReloadAddress = async () => {
    try {
      setLoading(true)
      dispatch(getAddressesByToken({ token: token }))
    } catch (error) {
      if (error && typeof error === 'object') {
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.warning(error.unconnect)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="title">Địa chỉ cá nhân</h2>
          <div className="ml-12">
            <IconButton disabled={loading} onClick={handleReloadAddress}>
              {loading ? <LoadingOutlined spin /> : <RedoOutlined />}
            </IconButton>
          </div>
        </div>
        <div className="flex content-center items-center gap-6 mb-6">
          <Button
            onClick={() => setOpen(true)}
            type="primary"
            htmlType="button"
            style={{ height: '2.7rem', backgroundColor: '#dc2f2f' }}
          >
            Thêm địa chỉ
          </Button>
        </div>
      </div>
      <div className="">
        <div>
          {deliveryAddress.map((address) => (
            <div key={address?.id} className="box flex items-center justify-between not-last:mb-6">
              <div className="flex flex-4 gap-2 items-center select-text">
                <div>
                  <Avatar size={48} style={{ backgroundColor: '#ffcbcb', color: '#dc2f2f' }} icon={<HomeFilled />} />
                </div>
                <div className="">
                  <div className="flex items-center gap-2 text-[#090d14] h-[2.3rem]">
                    <span className="sub-title">{address?.fullname}</span>
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
                <span onClick={() => showDrawer(address)} className="cursor-pointer text-[#dc2f2f]">
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
      </div>
    </div>
  )
}
