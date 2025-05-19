import { RHFInputField, RHFSwitch } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { AddressSelector } from '@/features/order/components'
import PropTypes from 'prop-types'

// import { createAddress } from '../features'

export const Address = ({ isUpdate, isLoading }) => {
  return (
    <>
      <div className="h-full">
        <div className="bg-secondary-foreground px-4 py-6 mb-4">
          <h1>{isUpdate ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h1>
        </div>
        <div className="flex flex-col gap-2 bg-secondary-foreground">
          <div className="px-4">
            <h2>Thông tin người nhận</h2>
            <div className="flex flex-col gap-2">
              <RHFInputField name="fullName" type="text" label="Họ và tên" placeholder="Nhập họ và tên..." />
              <RHFInputField name="phoneNumber" type="text" label="Số điện thoại" placeholder="Nhập số điện thoại..." />
            </div>
          </div>
          <div className="px-4">
            <h2>Địa chỉ người nhận</h2>
            <div className="flex flex-col gap-2 mt-1">
              <AddressSelector />
              <div className="mt-2">
                <RHFInputField
                  name="streetAddress"
                  type="text"
                  label="Địa chỉ cụ thể"
                  placeholder={'Nhập địa chỉ cụ thể...'}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 mt-3">
            <h3>Đặt làm địa chỉ mặc định</h3>
            <RHFSwitch name="default" />
          </div>
        </div>

        <div className=" px-4 py-6 mt-4 bg-secondary-foreground">
          <Button variant="secondary" disabled={isLoading('updating')} className=" cursor-pointer w-full">
            {isUpdate ? 'Cập nhật' : 'Tạo địa chỉ'}
          </Button>
        </div>
      </div>
    </>
  )
}

Address.propTypes = {
  isUpdate: PropTypes.bool,
  isLoading: PropTypes.bool
}
