import { Avatar } from '@mui/material'

import { Button } from '@/components/ui/button'
import PropTypes from 'prop-types'
import { RHFDateTimePicker, RHFInputField, RHFRadioGroup } from '../../../components/fields'
export const Profile = ({ handleCancel, isLoading }) => {
  return (
    <>
      <div className=" bg-white p-4 rounded-lg">
        <Button variant="link" onClick={handleCancel} className="mb-4 cursor-pointer link" type="button">
          Quay lại
        </Button>
        <div className="place-items-center">
          <div className="place-items-center mb-2">
            <Avatar
              src="https://img.icons8.com/?size=100&id=NPW07SMh7Aco&format=png&color=000000"
              sx={{ width: 100, height: 100 }}
            />
          </div>
          <div className="w-[50%] flex flex-col gap-4 mb-4">
            <RHFInputField name="fullName" type="text" label="Họ và tên" />
            <RHFInputField name="email" type="email" label="Email" />
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
                }
              ]}
            />
            <RHFDateTimePicker name="dateOfBirth" label="Ngày sinh" />
            <Button
              disabled={isLoading('updating')}
              variant="secondary"
              className="mt-4  cursor-pointer h-[38px]"
              type="submit"
            >
              Cập nhật
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

Profile.propTypes = {
  handleCancel: PropTypes.func,
  isLoading: PropTypes.func
}
