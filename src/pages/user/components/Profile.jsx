import { Avatar } from '@mui/material'
import { Spin } from 'antd'

import { handleAsyncSubmit } from '@/components/func'
import { Button } from '@/components/ui/button'
import useAppContext from '@/hooks/useAppContext'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import { RHFDateTimePicker, RHFInputField, RHFRadioGroup } from '../../../components/fields'
import { updateProfile } from '../features'
export const Profile = ({ handleCancel }) => {
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = useFormContext()

  const { dispatch } = useAppContext()

  const onSubmit = async (values) => {
    const formatDateOfBirth = new Date(values?.dateOfBirth).toLocaleDateString('en-CA')
    const filtedValues = omit(values, ['uid'])
    const dataToSend = { ...filtedValues, dateOfBirth: formatDateOfBirth }
    await handleAsyncSubmit({
      asyncAction: (vals) => dispatch(updateProfile(vals)).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)
        handleCancel()
      },
      toast,
      setError,
      values: dataToSend
    })
  }
  return (
    <>
      <Spin spinning={isSubmitting}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" bg-white p-4 rounded-lg">
            <Button variant="outline" onClick={handleCancel} className="mb-4 cursor-pointer h-[38px]" type="button">
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
                      id: 1,
                      value: 'MALE',
                      label: 'Nam'
                    },
                    {
                      id: 2,
                      value: 'FEMALE',
                      label: 'Nữ'
                    }
                  ]}
                />
                <RHFDateTimePicker name="dateOfBirth" label="Ngày sinh" />
                <Button
                  variant="secondary"
                  disabled={isSubmitting}
                  className="mt-4  cursor-pointer h-[38px]"
                  type="submit"
                >
                  Cập nhật
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Spin>
    </>
  )
}

Profile.propTypes = {
  handleCancel: PropTypes.func
}
