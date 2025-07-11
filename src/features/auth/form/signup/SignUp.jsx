import { RHFInputField, RHFRadioGroup, RHFSelect } from '@/components/fields'
import { RHFInputPassword } from '@/components/fields/RHFInputPassword'
import { days, GENDER_OPTIONS, months, years } from '@/constants'
import { useCustomTranslate } from '@/i18n'
import PropTypes from 'prop-types'
export const SignUp = () => {
  const { t } = useCustomTranslate()
  return (
    <div className="flex flex-col gap-4 mb-10 mt-6">
      <RHFInputField
        isRequired
        label={`${t('auth:signup.form.fullName')}`}
        name="profile.fullName"
        type="text"
        placeholder={`${t('auth:signup.form.fullName')}`}
      />
      <RHFInputField
        label={`${t('auth:signup.form.phone')}`}
        name="profile.phone"
        type="text"
        placeholder={`${t('auth:signup.form.phone')}`}
      />
      <RHFInputPassword
        label={`${t('auth:signup.form.password')}`}
        isRequired
        name="password"
        placeholder={`${t('auth:signup.form.password')}`}
      />
      <RHFInputPassword
        label={`${t('auth:signup.form.repeatPassword')}`}
        isRequired
        name="repeatPassword"
        placeholder={`${t('auth:signup.form.repeatPassword')}`}
      />
      <RHFInputField label="Email" isRequired name="email" type="text" placeholder="Email" />
      <RHFRadioGroup label={`${t('auth:signup.form.gender.label')}`} name="profile.gender" options={GENDER_OPTIONS} />
      <div className="grid grid-cols-3 gap-3">
        <RHFSelect placeholder="Ngày" name="profile.birthday.day" label="Ngày" showSearch options={days} />
        <RHFSelect placeholder="Tháng" name="profile.birthday.month" label="Tháng" options={months} />
        <RHFSelect placeholder="Năm" name="profile.birthday.year" label="Năm" showSearch options={years} />
      </div>
    </div>
  )
}

SignUp.propTypes = {
  onSubmit: PropTypes.func
}
