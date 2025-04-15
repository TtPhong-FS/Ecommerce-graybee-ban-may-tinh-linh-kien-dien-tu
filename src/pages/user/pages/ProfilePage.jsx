import { Avatar } from '@mui/material'
import { Button } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Loading } from '../../../components/Loading'
import { useMessage } from '../../../hooks'
import { ProfileProvider } from '../components/ProfileProvider'
import { getProfileByToken } from '../features'
export const ProfilePage = () => {
  const dispatch = useDispatch()

  const { contextHolder, messageApi } = useMessage()

  const [isEdit, setIsEdit] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialData, setInitialData] = useState(null)
  const user = useSelector((state) => state.account.user)

  const handleUpdate = async () => {
    try {
      setLoading(true)
      const response = await dispatch(getProfileByToken()).unwrap()
      if (response.status === 200) {
        setInitialData(response.data)
        setIsEdit(true)
        setIsUpdate(true)
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

  const handleCancel = () => {
    setIsEdit(false)
    setIsUpdate(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="">
      {contextHolder}
      <h2 className="title py-3 mb-4">Thông tin cá nhân</h2>
      {isEdit ? (
        <ProfileProvider handleCancel={handleCancel} initialData={initialData} isUpdate={isUpdate} />
      ) : (
        <div className="flex justify-center items-center bg-white p-4 rounded-lg">
          <div className="w-[50%] ">
            <div className="place-items-center">
              <Avatar
                src="https://img.icons8.com/?size=100&id=NPW07SMh7Aco&format=png&color=000000"
                sx={{ width: 100, height: 100 }}
              />
            </div>
            <div className="flex items-center justify-center mt-2 mb-4">
              <span className="space-x-1 text-gray-500">
                <span>UID:</span>
                <span className="text-[#090d14] font-semibold">{user?.uid}</span>
              </span>
            </div>
            <div className="mb-8">
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-[#6b7280] text-[16px]">Họ và tên</span>
                <span className="font-semibold  text-[16px] uppercase">{user?.fullName}</span>
              </span>
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-[#6b7280]  text-[16px]">Số điện thoại</span>
                <span className="font-semibold  text-[16px]">{user?.phoneNumber}</span>
              </span>
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-[#6b7280]  text-[16px]">Email</span>
                <span className="font-semibold  text-[16px]">{user?.email}</span>
              </span>
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-[#6b7280]  text-[16px]">Ngày sinh</span>
                <span className="font-semibold  text-[16px]">{user?.dateOfBirth}</span>
              </span>
            </div>
            <Button
              onClick={handleUpdate}
              className="mb-4"
              type="primary"
              htmlType="button"
              style={{ width: '100%', height: '2.7rem' }}
            >
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
