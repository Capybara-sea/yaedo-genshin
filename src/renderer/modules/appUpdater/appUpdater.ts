import type { ButtonProps, NotificationReactive } from 'naive-ui'

import { NButton } from 'naive-ui'
import { useDiscreteApi } from '@/hooks'

export class AppUpdater {
  downloadingNotification: NotificationReactive | undefined = undefined

  hasUpdate(callback: (res: any) => void) {
    const note = notificationFactory({
      type: 'info',
      title: '新版本',
      content: '检测到新版本，是否下载更新？',
      agreeText: '现在下载',
      agree: () => {
        callback({ update: true })
        note.destroy()
      },
      disagreeText: '下次一定',
      disagree: () => {
        callback({ update: false })
        note.destroy()
      },
    })
  }

  downloading(callback: (res: any) => void, data: { progress: number }) {
    const progressStr = (progress: number = 0) => `当前下载进度：${progress}%`
    if (!this.downloadingNotification) {
      this.downloadingNotification = notificationFactory({
        type: 'info',
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
      this.downloadingNotification.duration = 1000
      this.downloadingNotification = undefined
    }
    const note = notificationFactory({
      type: 'success',
      title: '下载完成',
      content: '新版本下载完成，重启应用以更新版本',
      agreeText: '现在重启',
      agree: () => {
        callback({ restart: true })
        note.destroy()
      },
      disagreeText: '稍后重启',
      disagree: () => {
        callback({ restart: false })
        note.destroy()
      },
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
    notificationFactory({
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

interface NotificationFactoryOptions {
  type: 'default' | 'error' | 'info' | 'success' | 'warning' | undefined
  title: string
  content?: string
  agreeText?: string
  agree?: () => void
  disagreeText?: string
  disagree?: () => void
}
function notificationFactory(opt: NotificationFactoryOptions) {
  const { notification } = useDiscreteApi()
  return notification.value.create({
    type: opt.type,
    title: opt.title,
    content: opt.content,
    ...(opt.agree || opt.disagree
      ? {
          action: () =>
            h('div', [
              opt.agree &&
                createButton({
                  type: 'primary',
                  content: opt.agreeText || '确定',
                  onClick: opt.agree,
                }),
              opt.disagree &&
                createButton({
                  content: opt.disagreeText || '取消',
                  style: 'margin-left: 10px',
                  onClick: opt.disagree,
                }),
            ]),
        }
      : {}),
  })
}
