import { Avatar } from '@mui/material'
import { Button, Spin } from 'antd'

import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { RHFDateTimePicker, RHFInputField, RHFRadioGroup } from '../../../components/fields'
import { useMessage } from '../../../hooks'
import { updateProfile } from '../features'
import { defaultValues } from '../types/schema'
export const Profile = ({ handleCancel }) => {
  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting }
  } = useFormContext()
  const { contextHolder, messageApi } = useMessage()
  const [loading, setLoading] = useState()
  const dispatch = useDispatch()

  const onSubmit = async (values) => {
    try {
      setLoading(true)
      const formatDateOfBirth = new Date(values?.dateOfBirth).toLocaleDateString('en-CA')
      const filtedValues = omit(values, ['uid'])
      const request = { ...filtedValues, dateOfBirth: formatDateOfBirth }
      const response = await dispatch(updateProfile({ request: request })).unwrap()
      if (response.status === 200) {
        messageApi.open({ type: 'success', content: response.message, duration: 0.5 })
        reset(defaultValues)
        handleCancel()
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" bg-white p-4 rounded-lg">
            <Button
              disabled={loading}
              onClick={handleCancel}
              className="mb-4"
              style={{ height: '2.7rem' }}
              type="primary"
              htmlType="button"
            >
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
                  disabled={loading}
                  className="mt-4 font-semibold text-[1rem] "
                  style={{ backgroundColor: '#dc2f2f', color: 'white', height: '2.7rem' }}
                  type="primary"
                  htmlType="submit"
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
