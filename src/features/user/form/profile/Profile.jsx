import { Avatar } from '@mui/material'

import { RHFInputField, RHFRadioGroup, RHFSelect } from '@/components/fields'
import { AvatarImage } from '@/components/ui/avatar'
import { days, months, years } from '@/constants'
export const Profile = () => {
  return (
    <div className="place-items-center">
      <div className="place-items-center mb-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </div>
      <div className="w-[50%] flex flex-col gap-4 mb-4">
        <RHFInputField name="fullName" type="text" label="Họ và tên" />
        <RHFInputField name="phone" type="text" label="Số điện thoại" />
        <RHFRadioGroup
          name="gender"
          label="Giới tính"
          options={[
            {
              value: 'MALE',
              label: 'Nam'
            },
            {
              value: 'FEMALE',
              label: 'Nữ'
            },
            {
              value: 'ORTHER',
              label: 'Khác'
            }
          ]}
        />
        <div className="grid grid-cols-3 gap-6">
          <RHFSelect name="birthday.day" label="Ngày" showSearch options={days} />
          <RHFSelect name="birthday.month" label="Tháng" options={months} />
          <RHFSelect name="birthday.year" label="Năm" showSearch options={years} />
        </div>
      </div>
    </div>
  )
}
