import { Link } from 'react-router-dom'

import { RHFDateTimePicker, RHFInputField, RHFRadioGroup } from '@/components/fields'
import { Button } from '@/components/ui/button'
import { useCustomTranslate } from '@/i18n'
import PropTypes from 'prop-types'
export const SignUp = () => {
  const { t } = useCustomTranslate()
  return (
    <>
      <div className="flex items-center justify-center w-full">
        <h1>{t('auth:signup.title')}</h1>
      </div>

      <div className="flex flex-col gap-4 mb-10 mt-6">
        <RHFInputField
          label={`${t('auth:signup.form.fullName')}`}
          name="fullName"
          type="text"
          placeholder={`${t('auth:signup.form.fullName')}`}
        />
        <RHFInputField
          label={`${t('auth:signup.form.phone')}`}
          name="phone"
          isRequired
          type="text"
          placeholder={`${t('auth:signup.form.phone')}`}
        />
        <RHFInputField
          label={`${t('auth:signup.form.password')}`}
          isRequired
          name="password"
          type="password"
          placeholder={`${t('auth:signup.form.password')}`}
        />
        <RHFInputField label="Email" isRequired name="email" type="email" placeholder="Email" />
        <RHFRadioGroup
          label={`${t('auth:signup.form.gender.label')}`}
          name="gender"
          options={[
            {
              value: 'MALE',
              label: t('auth:signup.form.gender.option.male')
            },
            {
              value: 'FEMALE',
              label: t('auth:signup.form.gender.option.female')
            }
          ]}
        />
        <RHFDateTimePicker label={`${t('auth:signup.form.dateOfBirth')}`} name="dateOfBirth" />
      </div>
      <Button variant="secondary" type="submit" className="cursor-pointer h-[40px] w-full select-none">
        {t('auth:signup.btnRegister')}
      </Button>

      <div className="flex items-center text-sm justify-center mt-6 gap-1">
        <p>{t('auth:signup.alreadyAccount')}</p>
        <Link className="text-sm link" to="/login">
          {t('auth:signup.btnLogin')}
        </Link>
      </div>
    </>
  )
}

SignUp.propTypes = {
  onSubmit: PropTypes.func
}
