import { useCustomTranslate } from '@/i18n'
import * as yup from 'yup'
export const useValidationSchema = () => {
  const { t } = useCustomTranslate()
  return {
    schema: yup.object().shape({
      phone: yup
        .string()
        .required(t('auth:signup.form.validation.required', { field: 'Phone' }))
        .min(10, t('auth:signup.form.validation.min', { field: 'Phone', min: 10 }))
        .max(12, t('auth:signup.form.validation.max', { field: 'Phone', max: 12 }))
        .matches(/^[0-9]+$/, t('auth:signup.form.validation.required', { field: 'Phone' })),
      password: yup
        .string()
        .required(t('auth:signup.form.validation.required', { field: 'Password' }))
        .max(100, t('auth:signup.form.validation.max', { field: 'Password', max: 100 }))
        .min(8, t('auth:signup.form.validation.min', { field: 'Password', min: 8 }))
    })
  }
}
