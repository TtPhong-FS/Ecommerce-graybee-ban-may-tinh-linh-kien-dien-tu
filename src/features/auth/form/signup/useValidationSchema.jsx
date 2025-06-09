import { patterns } from '@/constants'
import { useCustomTranslate } from '@/i18n'
import { subYears } from 'date-fns'
import * as yup from 'yup'
export function useValidationSchema() {
  const { t } = useCustomTranslate()

  return {
    schema: yup.object().shape({
      fullName: yup.string().max(100, 'Tên quá dài').nullable().notRequired(),
      phone: yup
        .string()
        .required(t('auth:signup.form.validation.required', { field: 'Phone' }))
        .min(10, t('auth:signup.form.validation.min', { field: 'Phone', min: 10 }))
        .max(12, t('auth:signup.form.validation.max', { field: 'Phone', max: 12 }))
        .matches(/^[0-9]+$/, t('auth:signup.form.validation.required', { field: 'Phone' })),
      email: yup
        .string()
        .required(t('auth:signup.form.validation.required', { field: 'Email' }))
        .max(50, t('auth:signup.form.validation.max', { field: 'Email', max: 50 }))
        .matches(patterns.email, t('auth:signup.form.validation.email_not_match')),
      password: yup
        .string()
        .required(t('auth:signup.form.validation.required', { field: 'Password' }))
        .max(100, t('auth:signup.form.validation.max', { field: 'Password', max: 100 }))
        .min(8, t('auth:signup.form.validation.min', { field: 'Password', min: 8 })),
      dateOfBirth: yup
        .date()
        .transform((value, originalValue) => {
          return originalValue === '' ? null : value
        })
        .nullable()
        .notRequired()
        .test('is-18-or-older', t('auth:signup.form.validation.minAge', { minAge: 18 }), function (value) {
          if (!value) return true
          const todayMinus18 = subYears(new Date(), 18)
          return value <= todayMinus18
        })
    })
  }
}
