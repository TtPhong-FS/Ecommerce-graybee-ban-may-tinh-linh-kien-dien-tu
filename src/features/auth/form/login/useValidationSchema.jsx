import { patterns } from '@/constants'
import { useCustomTranslate } from '@/i18n'
import * as yup from 'yup'
export const useValidationSchema = () => {
  const { t } = useCustomTranslate()
  return {
    schema: yup.object({
      email: yup
        .string()
        .required(t('auth:login.form.validation.email.required'))
        .max(100, t('auth:login.form.validation.email.too_long'))
        .matches(patterns.email, t('auth:login.form.validation.email.invalid')),
      password: yup
        .string()
        .max(100, t('auth:login.form.validation.password.too_long'))
        .required(t('auth:login.form.validation.password.required'))
    })
  }
}
