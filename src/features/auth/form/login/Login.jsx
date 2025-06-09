import { Link } from 'react-router-dom'

import { RHFInputField } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { useCustomTranslate } from '@/i18n'

export const Login = () => {
  const { t } = useCustomTranslate()

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <h1>{t('auth:login.title')}</h1>
      </div>
      <div>
        <div className="flex flex-col gap-4 mb-2 mt-6">
          <RHFInputField
            label={`${t('auth:login.form.phone')}`}
            name="phone"
            placeholder={`${t('auth:login.form.phone')}`}
            type="text"
          />
          <RHFInputField
            label={`${t('auth:login.form.password')}`}
            name="password"
            placeholder={`${t('auth:login.form.password')}`}
            type="password"
          />
        </div>
        <div className="flex justify-end mb-8">
          <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline decoration-solid">
            {t('auth:login.btnForgotPassword')}
          </Link>
        </div>
        <Button variant="secondary" type="submit" className="cursor-pointer h-[40px]  w-full text-sm">
          {t('auth:login.btnLogin')}
        </Button>
      </div>
      <div className="flex items-center justify-center mt-6 gap-1">
        <p className="text-sm">{t('auth:login.noAccountYet')}</p>
        <Link className="text-blue-500 hover:underline text-sm decoration-solid" to="/signup">
          {t('auth:login.btnSignUp')}
        </Link>
      </div>
    </>
  )
}
