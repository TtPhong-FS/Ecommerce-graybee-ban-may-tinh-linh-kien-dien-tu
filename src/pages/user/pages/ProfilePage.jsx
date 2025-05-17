import { Avatar } from '@mui/material'

import { handleAsync } from '@/components/func'
import { Button } from '@/components/ui/button'
import useAppContext from '@/hooks/useAppContext'
import useLoading from '@/hooks/useLoading'
import { Spin } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { ProfileProvider } from '../components/ProfileProvider'
import { getProfileByTokenAsync } from '../features'
export const ProfilePage = () => {
  const { dispatch } = useAppContext()

  const { isLoading, start, stop } = useLoading()

  const [isEdit, setIsEdit] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [initialData, setInitialData] = useState(null)

  const user = useSelector((state) => state.account.user)

  const handleUpdate = async () => {
    await handleAsync({
      asyncAction: () => dispatch(getProfileByTokenAsync()).unwrap(),
      onSuccess: (res) => {
        setInitialData(res?.data)
        setIsEdit(true)
        setIsUpdate(true)
      },
      toast,
      loadingKey: 'getProfileByToken',
      startLoading: start,
      stopLoading: stop
    })
  }

  const handleCancel = () => {
    setIsEdit(false)
    setIsUpdate(false)
  }

  return (
    <Spin spinning={isLoading('getProfileByToken')} className="">
      <h1 className="pb-6 pt-3">Thông tin cá nhân</h1>
      {isEdit ? (
        <ProfileProvider handleCancel={handleCancel} initialData={initialData} isUpdate={isUpdate} />
      ) : (
        <div className="flex justify-center items-center bg-white p-4 rounded-lg">
          <div className="w-[50%]">
            <div className="place-items-center">
              <Avatar
                src="https://img.icons8.com/?size=100&id=NPW07SMh7Aco&format=png&color=000000"
                sx={{ width: 100, height: 100 }}
              />
            </div>
            <div className="flex items-center justify-center mt-2 mb-4">
              <span className="space-x-1 text-muted-foreground">
                <span className="text-sm">UID:</span>
                <span className="text-primary font-semibold">{user?.uid}</span>
              </span>
            </div>
            <div className="mb-8 text-sm">
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-muted-foreground ">Họ và tên</span>
                <span className="font-semibold  uppercase">{user?.fullName}</span>
              </span>
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-muted-foreground ">Số điện thoại</span>
                <span className="font-semibold ">{user?.phoneNumber}</span>
              </span>
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-muted-foreground ">Email</span>
                <span className="font-semibold ">{user?.email}</span>
              </span>
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-muted-foreground ">Ngày sinh</span>
                <span className="font-semibold ">{user?.dateOfBirth}</span>
              </span>
            </div>
            <Button
              variant="secondary"
              onClick={handleUpdate}
              className="mb-4 cursor-pointer h-[38px] w-full"
              type="button"
            >
              Chỉnh sửa thông tin
            </Button>
          </div>
        </div>
      )}
    </Spin>
  )
}
