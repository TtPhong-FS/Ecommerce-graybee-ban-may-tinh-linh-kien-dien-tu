import { Spin } from 'antd'

const contentStyle = {
  padding: 50,
  background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4
}

const content = <div style={contentStyle} />

export const Loading = () => {
  return (
    <Spin tip="Đang tải" className="text-secondary shadow-none dark:bg-secondary-foreground" size="small">
      {content}
    </Spin>
  )
}
