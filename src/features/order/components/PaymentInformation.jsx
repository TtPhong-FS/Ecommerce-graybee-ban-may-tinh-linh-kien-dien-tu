import { RHFRadioGroup } from '@/components/fields'
import { paymentMethod } from '..'

export function PaymentInformation() {
  return (
    <div className="box">
      <h2 className="mb-1 sub-title">Hình thức thanh toán</h2>
      <div className="h-40">
        <RHFRadioGroup name="paymentMethod" options={paymentMethod} />
      </div>
    </div>
  )
}
