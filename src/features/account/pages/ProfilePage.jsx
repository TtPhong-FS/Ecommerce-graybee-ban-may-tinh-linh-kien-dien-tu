import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAppContext, useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { handleAsync } from '@/lib'
import { Spin } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { genderMap } from '../constants'
import { ProfileProvider } from '../form/profile'
import { fetchProfileByTokenAsync } from '../redux'
import { selectProfile } from '../redux/accountSelector'
export const ProfilePage = () => {
  const { t } = useCustomTranslate()
  const { dispatch } = useAppContext()

  const { isLoading, start, stop } = useLoading()

  const [isEdit, setIsEdit] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [initialData, setInitialData] = useState(null)

  const profile = useSelector(selectProfile)

  const handleUpdate = async () => {
    await handleAsync({
      asyncAction: () => dispatch(fetchProfileByTokenAsync()).unwrap(),
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
      <div className="mb-8">
        <h5 className="font-bold text-secondary-foreground uppercase">{t('customer:profile.title')}</h5>
      </div>
      {isEdit ? (
        <ProfileProvider handleCancel={handleCancel} initialData={initialData} isUpdate={isUpdate} />
      ) : (
        <div className="flex justify-center items-center bg-white p-4 rounded-lg">
          <div className="max-md:w-full w-1/2">
            <div className="place-items-center">
              <Avatar className="w-28 h-28">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </div>
            <div className="flex items-center justify-center mt-2 mb-4"></div>
            <div className="mb-8 text-sm">
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-muted-foreground ">{t('customer:profile.fullName')}</span>
                <div>
                  {profile?.fullName === null || profile?.fullName === '' ? (
                    <span className="text-muted-foreground italic "> không có dữ liệu</span>
                  ) : (
                    profile?.fullName
                  )}
                </div>
              </span>
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-muted-foreground ">{t('customer:profile.phone')}</span>
                <div>
                  {profile?.phone === null || profile?.phone === '' ? (
                    <span className="text-muted-foreground italic "> không có dữ liệu</span>
                  ) : (
                    profile?.phone
                  )}
                </div>
              </span>

              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-muted-foreground ">{t('customer:profile.dateOfBirth')}</span>
                <span className="">{profile?.birthday}</span>
              </span>
              <span className="flex justify-between border-b-1 border-gray-300 py-3 select-text">
                <span className="text-muted-foreground ">Giới tính</span>
                <span className="">{genderMap[profile?.gender]}</span>
              </span>
            </div>
            <Button
              variant="secondary"
              onClick={handleUpdate}
              className="mb-4 cursor-pointer h-[38px] w-full"
              type="button"
            >
              {t('customer:profile.edit')}
            </Button>
          </div>
        </div>
      )}
    </Spin>
  )
}
