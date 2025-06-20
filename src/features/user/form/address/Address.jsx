import { RHFInputField, RHFSwitch } from '@/components/fields'
import { AddressOption } from './AddressOption'

// import { createAddress } from '../features'

export const Address = () => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="px-4">
        <h2 className="mb-2">Thông tin người nhận</h2>
        <div className="flex flex-col gap-2">
          <RHFInputField isRequired name="recipientName" type="text" label="Họ và tên" placeholder="Nhập họ và tên" />
          <RHFInputField isRequired name="phone" type="text" label="Số điện thoại" placeholder="Nhập số điện thoại" />
        </div>
      </div>
      <div className="px-4">
        <h2 className="mb-2">Địa chỉ người nhận</h2>
        <div className="flex flex-col gap-2 mt-1">
          <AddressOption />
          <div className="mt-2">
            <RHFInputField
              isRequired
              name="street"
              type="text"
              label="Địa chỉ cụ thể"
              placeholder={'Nhập địa chỉ cụ thể'}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 mt-3">
        <h3>Đặt làm địa chỉ mặc định</h3>
        <RHFSwitch name="default" />
      </div>
    </div>
  )
}
