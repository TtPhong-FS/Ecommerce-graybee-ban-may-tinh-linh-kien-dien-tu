import { Button } from '@/components/ui/button'
import { CartItem } from '@/features/cart'
import { useAppContext } from '@/hooks'
import { useCustomTranslate } from '@/i18n'
import { Grid2 } from '@mui/material'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { CustomerInfo } from '../components'
import { PaymentInformation } from '../components/PaymentInformation'
import { ShippingInformation } from '../components/ShippingInformation'
import { ConfirmOrder } from './ConfirmOrder'

export const Order = () => {
  const { t } = useCustomTranslate()
  const { navigate } = useAppContext()

  const cartItems = useSelector((state) => state.cart.cartItems)
  const [confirm, setConfirm] = useState(false)

  const { clearErrors } = useFormContext()

  const onUnConfirm = () => {
    setConfirm(false)
    clearErrors()
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <div>
          {confirm && (
            <div className="mb-4">
              <span
                onClick={() => onUnConfirm()}
                className="text-blue-500 text-[1rem] hover:decoration-solid hover:underline cursor-pointer"
              >
                Quay trở về giỏ hàng
              </span>
            </div>
          )}
          <Grid2 container spacing={2}>
            <Grid2 size={{ mobile: 12, tablet: 12, laptop: 8 }}>
              <CartItem />
              {confirm && (
                <Grid2 container spacing={2} mt={2}>
                  <CustomerInfo />
                  <ShippingInformation />
                  <PaymentInformation />
                </Grid2>
              )}
            </Grid2>
            <Grid2 sx={{ position: 'relative' }} size={{ mobile: 12, tablet: 12, laptop: 4 }}>
              <ConfirmOrder confirm={confirm} setConfirm={setConfirm} />
            </Grid2>
          </Grid2>
        </div>
      ) : (
        <div className="place-items-center text-center bg-white p-4 rounded-md">
          <p className="mb-8 mt-2 text-muted-foreground">{t('order:empty')}</p>
          <Button className="cursor-pointer h-[40px]" variant="secondary" type="button" onClick={() => navigate('/')}>
            {t('order:continueShopping')}
          </Button>
        </div>
      )}
    </>
  )
}
