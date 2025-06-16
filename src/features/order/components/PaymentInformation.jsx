import { RHFRadioGroup } from '@/components/fields'
import { paymentMethod } from '..'

export function PaymentInformation() {
  return (
    <div className="card">
      <h2 className="mb-1 sub-title">Hình thức thanh toán</h2>
      <div className="">
        <RHFRadioGroup name="paymentMethod" options={paymentMethod} />
      </div>
    </div>
  )
}
