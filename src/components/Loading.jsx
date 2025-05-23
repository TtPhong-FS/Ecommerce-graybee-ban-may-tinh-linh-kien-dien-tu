import { useCustomTranslate } from '@/i18n'
import { Spin } from 'antd'

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4
}

const content = <div style={contentStyle} />

export const Loading = () => {
  const { t } = useCustomTranslate()
  return (
    <Spin tip={t('common:loading')} className="text-secondary shadow-none dark:bg-secondary-foreground" size="small">
      {content}
    </Spin>
  )
}
