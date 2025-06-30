import { HomeFilled } from '@ant-design/icons'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useLoading } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { handleAsync } from '@/lib'
import { Chip } from '@mui/material'
import { Avatar } from 'antd'
import { LoaderCircle, Trash } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import { toast } from 'sonner'
import { useAddressData } from '../data'
import { getAllAddressAsync, toggleAddressDefaultAsync } from '../redux'

export const ManageAddressPage = () => {
  const { t } = useCustomTranslate()
  const { address } = useAddressData()

  const { isLoading, start, stop } = useLoading()

  const dispatch = useDispatch()

  const handleSetDefailtAddress = async (id) => {
    await handleAsync({
      asyncAction: (id) => dispatch(toggleAddressDefaultAsync(id)).unwrap(),
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
      asyncAction: () => dispatch(getAllAddressAsync()).unwrap(),
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
      <Outlet />
      <div className="flex justify-between items-center px-4 mb-8">
        <h5 className="font-bold text-secondary-foreground uppercase">{t('customer:manageAddress.title')}</h5>

        <div className="flex justify-between items-center gap-6">
          <Button
            variant="outline"
            className="select-none  cursor-pointer  py-5"
            type="button"
            disabled={isLoading('reload')}
            onClick={handleReloadAddress}
          >
            {isLoading('reload') ? (
              <span className="flex items-center">
                <LoaderCircle className="animate-spin mr-2" />
                {t('common:loading')}
              </span>
            ) : (
              t('common:refresh')
            )}
          </Button>
          <Button asChild variant="secondary" className="py-5">
            <Link to={'create'}>Tạo địa chỉ</Link>
          </Button>
        </div>
      </div>
      {address.length > 0 ? (
        <div>
          {address.map((address) => (
            <div
              key={address?.id}
              className="card flex max-md:flex-col lg:items-center justify-between not-last:mb-6 text-sm max-md:gap-2"
            >
              <div className="flex flex-4 gap-2 items-center select-text">
                <div>
                  <Avatar size={48} style={{ backgroundColor: '#ffcbcb', color: '#dc2f2f' }} icon={<HomeFilled />} />
                </div>
                <div className="">
                  <div className="flex items-center gap-2 text-[#090d14] h-[2.3rem]">
                    <span className="sub-title">{address?.recipientName}</span>
                    <span className="text-gray-400">|</span>
                    <span className="font-normal">{address?.phone}</span>
                    {address?.default ? (
                      <Chip label="Mặc định" style={{ backgroundColor: '#ffcbcb', fontSize: '1rem' }} />
                    ) : null}
                  </div>
                  <div className="max-w-[25rem] ">{address?.street}</div>
                </div>
              </div>
              <div className="flex flex-2 items-center gap-4 justify-end lg:justify-between">
                <Link to={`edit/${address?.id}`} className="cursor-pointer text-error">
                  {t('common:edit')}
                </Link>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    id="default"
                    label="Mặc định"
                    checked={address.default}
                    onCheckedChange={() => handleSetDefailtAddress(address?.id)}
                  />
                  <Label htmlFor="default">Đặt làm mặc định</Label>
                </div>

                <Link
                  className={`${
                    isLoading(`delete:${address?.id}`) ? 'pointer-events-none' : 'cursor-pointer '
                  } hover:bg-muted-foreground/10 w-8 h-8 rounded-full place-items-center place-content-center  `}
                  to={`delete/${address?.id}`}
                >
                  <Trash size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 text-sm rounded-md text-center select-none bg-primary-foreground text-muted-foreground">
          {t('customer:manageAddress.empty')}
        </div>
      )}
    </div>
  )
}
