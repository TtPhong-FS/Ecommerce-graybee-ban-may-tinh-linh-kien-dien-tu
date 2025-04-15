import Cookies from 'js-cookie'

import { Button, Spin } from 'antd'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { RHFInputField, RHFSwitch } from '../../../components/fields'
import { useMessage } from '../../../hooks'
import { createAddress, updateAddress } from '../features'
import { defaultValues } from '../types/address'
import { AddressSelector } from './AddressSelector'
// import { createAddress } from '../features'

export const Address = ({ isUpdate, onClose }) => {
  const dispatch = useDispatch()
  const token = Cookies.get('token')

  const {
    handleSubmit,
    reset,
    setError,
    formState: { isSubmitting }
  } = useFormContext()
  const [loading, setLoading] = useState(false)
  const { contextHolder, messageApi } = useMessage()
  const onSubmit = async (values) => {
    try {
      setLoading(true)
      if (isUpdate) {
        const request = omit(values, ['id'])
        console.log(request, values.id, token)
        const response = await dispatch(updateAddress({ request: request, id: values.id, token: token })).unwrap()
        if (response.status === 200) {
          await messageApi.open({ type: 'success', content: response.message, duration: 0.5 })
          reset(defaultValues)
          onClose()
        }
      } else {
        const response = await dispatch(createAddress({ request: values, token: token })).unwrap()
        if (response.status === 201) {
          await messageApi.open({ type: 'success', content: response.message, duration: 0.5 })
          reset(defaultValues)
          onClose()
        }
      }
    } catch (error) {
      if (error && typeof error === 'object') {
        Object.entries(error).forEach(([field, message]) => {
          setError(field, { type: 'server', message })
        })
        if (error.general) {
          messageApi.error(error.general)
        }
        if (error.unconnect) {
          messageApi.warning(error.unconnect)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <Spin spinning={isSubmitting}>
        <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white px-4 py-6 mb-4">
            <h2 className="sub-title">{isUpdate ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h2>
          </div>
          <div>
            <div className="p-4">
              <h2 className="text-gray-500 text-[1.2rem] mb-4">Thông tin người nhận</h2>
              <div className="flex flex-col gap-4">
                <RHFInputField name="fullname" type="text" label="Họ và tên" />
                <RHFInputField name="phoneNumber" type="text" label="Số điện thoại" />
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-gray-500 text-[1.2rem] mb-4">Địa chỉ người nhận</h2>
              <div className="flex flex-col gap-2">
                {/* <RHFSelect name="city" type="text" label="Tỉnh/Thành phố" options={cityOption} />
              <RHFSelect name="district" type="text" label="Quận/Huyện" />
              <RHFSelect name="commune" type="text" label="Phường/Xã" /> */}
                <AddressSelector />
                <div className="mt-2">
                  <RHFInputField name="streetAddress" type="text" label="Địa chỉ cụ thể" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4">
              <h2 className="text-gray-500 text-[1.2rem]">Đặt làm địa chỉ mặc định</h2>
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
