import { Button } from '@/components/ui/button'
import { Spin } from 'antd'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { RHFInputField, RHFSwitch } from '../../../components/fields'
import { handleAsyncSubmit } from '../../../components/func'
import { createAddress, updateAddress } from '../features'
import { AddressSelector } from './AddressSelector'

// import { createAddress } from '../features'

export const Address = ({ isUpdate, onClose }) => {
  const dispatch = useDispatch()

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting }
  } = useFormContext()

  const onSubmit = async (values) => {
    console.log(values)
    const request = omit(values, ['id'])
    await handleAsyncSubmit({
      asyncAction: (vals) =>
        dispatch(isUpdate ? updateAddress({ request: request, id: values.id }) : createAddress(vals)).unwrap(),
      onSuccess: (res) => {
        toast.success(res?.message)
      },
      setError,
      toast,
      values: request
    })
  }

  return (
    <>
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
            <Button variant="secondary" disabled={isSubmitting} className="cursor-pointer h-[38px]">
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
