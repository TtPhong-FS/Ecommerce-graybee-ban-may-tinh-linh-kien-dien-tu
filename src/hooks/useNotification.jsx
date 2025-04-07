import { notification } from 'antd'

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (type, message, description) => {
    api[type](
      {
        message,
        description
      },
      [api]
    )
  }

  return {
    contextHolder,
    openNotificationWithIcon
  }
}
