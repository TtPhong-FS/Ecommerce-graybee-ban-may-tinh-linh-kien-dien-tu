import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'

export const GeneralInfo = () => {
  const details = useSelector((state) => state.product.details, shallowEqual)
  return (
    <div className="text-base box">
      <p className="sub-title">Thương hiệu: {details?.manufacturerName}</p>
      <p className="sub-title">Tình trạng: {details?.conditions}</p>
      <p className="sub-title">Bảo hàng: {details?.warranty} tháng</p>
      <p className="sub-title">Cân nặng: {details?.weight}kg</p>
      <p className="sub-title">Màu: {details?.color}</p>
    </div>
  )
}
