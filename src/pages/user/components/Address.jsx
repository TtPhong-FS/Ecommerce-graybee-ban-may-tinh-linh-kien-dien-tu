import { Button, Spin } from 'antd'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { RHFInputField, RHFSwitch } from '../../../components/fields'
import { handleAsyncSubmit } from '../../../components/func'
import { useNotification } from '../../../hooks'
import { createAddress, updateAddress } from '../features'
import { defaultValues } from '../types/address'
import { AddressSelector } from './AddressSelector'
import useAddressData from './data/useAddressData'

// import { createAddress } from '../features'

export const Address = ({ isUpdate, onClose }) => {
  const dispatch = useDispatch()

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting }
  } = useFormContext()

  const { contextHolder, openNotificationWithIcon } = useNotification()

  const { loading } = useAddressData()

  const onSubmit = async (values) => {
    console.log(values)
    if (isUpdate) {
      const request = omit(values, ['id'])

      const res = await dispatch(updateAddress({ request: request, id: values.id })).unwrap()
      if (res.status === 200) {
        openNotificationWithIcon('success', 'Thành công', res.message)
        reset(defaultValues)
        onClose()
      }
    } else {
      await handleAsyncSubmit({
        asyncAction: (vals) => dispatch(createAddress({ request: vals })).unwrap(),
        values,
        onSuccess: (res) => {
          openNotificationWithIcon('success', 'Thành công', res.message)
        },
        openNotificationWithIcon,
        setError
      })
    }
  }

  return (
    <>
      {contextHolder}
      <Spin spinning={isSubmitting}>
        <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white px-4 py-6 mb-4">
            <h1>{isUpdate ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h1>
          </div>
          <div>
            <div className="p-4">
              <h2>Thông tin người nhận</h2>
              <div className="flex flex-col gap-2">
                <RHFInputField name="fullName" type="text" label="Họ và tên" />
                <RHFInputField name="phoneNumber" type="text" label="Số điện thoại" />
              </div>
            </div>
            <div className="p-4">
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
            <div className="flex items-center justify-between p-4">
              <h2>Đặt làm địa chỉ mặc định</h2>
              <RHFSwitch name="default" />
            </div>
          </div>
          <div className=" px-4 py-6 mt-4 bg-white">
            <Button
              disabled={loading}
              className="font-semibold text-[1rem] "
              style={{ backgroundColor: '#dc2f2f', color: 'white', width: '100%', height: '2.7rem' }}
              type="primary"
              htmlType="submit"
            >
              {isUpdate ? 'Cập nhật' : 'Tạo địa chỉ'}
            </Button>
          </div>
        </form>
      </Spin>
    </>
  )
}

Address.propTypes = {
  isUpdate: PropTypes.bool,
  onClose: PropTypes.func
}
