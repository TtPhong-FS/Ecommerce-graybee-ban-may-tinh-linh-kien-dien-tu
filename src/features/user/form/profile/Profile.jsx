import { RHFInputField, RHFRadioGroup, RHFSelect } from '@/components/fields'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { days, GENDER_OPTIONS, months, years } from '@/constants'
export const Profile = () => {
  return (
    <div className="place-items-center">
      <div className="place-items-center mb-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </div>
      <div className="w-[50%] flex flex-col gap-4 mb-4">
        <RHFInputField isRequired name="fullName" type="text" label="Họ và tên" />
        <RHFInputField name="phone" type="text" label="Số điện thoại" />
        <RHFRadioGroup isRequired name="gender" label="Giới tính" options={GENDER_OPTIONS} />
        <div className="grid grid-cols-3 gap-6">
          <RHFSelect isRequired name="birthday.day" label="Ngày" showSearch options={days} />
          <RHFSelect isRequired name="birthday.month" label="Tháng" options={months} />
          <RHFSelect isRequired name="birthday.year" label="Năm" showSearch options={years} />
        </div>
      </div>
    </div>
  )
}
