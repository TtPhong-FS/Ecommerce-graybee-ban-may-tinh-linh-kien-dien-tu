import { Link } from 'react-router-dom'

import { RHFInputField } from '@/components/fields'
import { useCustomTranslate } from '@/i18n'

export const Login = () => {
  const { t } = useCustomTranslate()

  return (
    <>
      <div>
        <div className="flex flex-col gap-4 mb-2 mt-2">
          <RHFInputField
            label={`${t('auth:login.form.email')}`}
            name="email"
            placeholder="name@example.com"
            type="text"
          />
          <RHFInputField
            label={`${t('auth:login.form.password')}`}
            name="password"
            placeholder='******'
            type="password"
          />
        </div>
        <div className="flex justify-end mb-8">
          <Link to="/forgot-password" className="text-blue-500 text-sm hover:underline decoration-solid">
            {t('auth:login.btnForgotPassword')}
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center mt-6 gap-1">
        <p className="text-base">{t('auth:login.noAccountYet')}</p>
        <Link className="text-blue-500 hover:underline text-base decoration-solid" to="/signup">
          {t('auth:login.btnSignUp')}
        </Link>
      </div>
    </>
  )
}
