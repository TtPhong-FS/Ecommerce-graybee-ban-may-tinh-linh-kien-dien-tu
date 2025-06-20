import { patterns } from '@/constants'
import { useCustomTranslate } from '@/i18n'
import * as yup from 'yup'
export function useValidationSchema() {
  const { t } = useCustomTranslate()

  return {
    schema: yup.object().shape({
      fullName: yup.string().max(100, 'Tên quá dài').required('Vui lòng nhập họ và tên'),
      phone: yup.string().max(12, t('auth:signup.form.validation.max')).nullable().notRequired(),
      email: yup
        .string()
        .required(t('auth:signup.form.validation.required.email'))
        .max(50, t('auth:signup.form.validation.max.email'))
        .matches(patterns.email, t('auth:signup.form.validation.invalid.email')),
      password: yup
        .string()
        .required(t('auth:signup.form.validation.required.password'))
        .max(100, t('auth:signup.form.validation.max.password'))
        .min(6, t('auth:signup.form.validation.min.password')),
      repeatPassword: yup
        .string()
        .required(t('auth:signup.form.validation.required.repeatPassword'))
        .max(100, t('auth:signup.form.validation.max.repeatPassword'))
        .min(6, t('auth:signup.form.validation.min.repeatPassword')),
      birthday: yup.object({
        day: yup.number().nullable().required('Vui lòng chọn ngày sinh'),
        month: yup.number().nullable().required('Vui lòng chọn tháng sinh'),
        year: yup.number().nullable().required('Vui lòng chọn năm sinh')
      }),
      gender: yup.string().required('Vui lòng chọn một giới tính')
    })
  }
}
