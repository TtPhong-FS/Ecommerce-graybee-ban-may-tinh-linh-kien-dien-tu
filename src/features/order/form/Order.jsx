import { Button } from '@/components/ui/button'
import { CartItem } from '@/features/cart'
import { useCustomTranslate } from '@/i18n'
import { Grid2 } from '@mui/material'
import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { CustomerInfo } from '../components'
import { PaymentInformation } from '../components/PaymentInformation'
import { ShippingInformation } from '../components/ShippingInformation'
import { ConfirmOrder } from './ConfirmOrder'

export const Order = () => {
  const { t } = useCustomTranslate()

  const cartItems = useSelector((state) => state.cart.cartItems)

  const cartItemsMemo = useMemo(() => cartItems, [cartItems])

  const [confirm, setConfirm] = useState(false)

  const { clearErrors } = useFormContext()

  const onUnConfirm = () => {
    setConfirm(false)
    clearErrors()
  }

  return (
    <>
      {cartItemsMemo?.length > 0 ? (
        <div>
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
              <ConfirmOrder confirm={confirm} setConfirm={setConfirm} onUnConfirm={onUnConfirm} />
            </Grid2>
          </Grid2>
        </div>
      ) : (
        <div className="place-items-center text-center bg-white p-4 rounded-md">
          <p className="mb-8 mt-2 text-muted-foreground">{t('order:empty')}</p>
          <Button className="cursor-pointer py-5 mb-4" asChild>
            <Link className="link" to={'/'}>
              {t('order:continueShopping')}
            </Link>
          </Button>
        </div>
      )}
    </>
  )
}
