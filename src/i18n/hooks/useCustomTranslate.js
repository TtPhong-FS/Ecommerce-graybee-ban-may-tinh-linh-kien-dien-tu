import { useTranslation } from 'react-i18next'

export function useCustomTranslate() {
  const { t, i18n, ready } = useTranslation('common', { useSuspense: true })
  return { t, i18n, ready }
}
