import type { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'
import type { ButtonProps, NotificationReactive } from 'naive-ui'

import { NButton } from 'naive-ui'
import { useDiscreteApi } from '@/hooks'

export class AppUpdater {
  notification: Ref<NotificationApiInjection>

  downloadingNotification: NotificationReactive | undefined = undefined

  constructor() {
    const { notification } = useDiscreteApi()
    this.notification = notification
  }

  downloading(callback: (res: any) => void, data: { progress: number }) {
    const progressStr = (progress: number = 0) => `当前下载进度：${progress}%`
    if (!this.downloadingNotification) {
      this.downloadingNotification = this.notification.value.info({
        title: '正在下载',
        content: progressStr(data.progress),
      })
    } else {
      this.downloadingNotification.content = progressStr(data.progress)
    }
  }

  downloaded(callback: (res: any) => void) {
    if (this.downloadingNotification) {
      this.downloadingNotification.type = 'success'
      this.downloadingNotification.title = '下载完成'
      this.downloadingNotification.duration = 5000
      this.downloadingNotification = undefined
    }
    const info = this.notification.value.info({
      title: '下载完成',
      content: '新版本下载完成，重启应用以更新版本',
      action: () =>
        h('div', [
          createButton({
            type: 'primary',
            content: '现在重启',
            onClick: () => {
              callback({ update: true })
              info.destroy()
            },
          }),
          createButton({
            content: '稍后重启',
            style: 'margin-left: 10px',
            onClick: () => {
              callback({ update: false })
              info.destroy()
            },
          }),
        ]),
    })
  }

  info(
    callback: (res: any) => void,
    data: {
      title: string
      content: string
      type: 'default' | 'error' | 'info' | 'success' | 'warning' | undefined
    }
  ): void {
    console.log('info', data)
    this.notification.value.create({
      type: data.type,
      title: data.title,
      content: data.content,
    })
  }
}

type ButtonConfig = {
  [key in keyof ButtonProps]: ButtonProps[key]
} & {
  content: string
  [key: string]: any
}
function createButton(opt: ButtonConfig) {
  return h(
    NButton,
    {
      ...opt,
      text: true,
      type: opt.type || 'default',
      onClick: opt.onClick,
    },
    {
      default: () => opt.content,
    }
  )
}
