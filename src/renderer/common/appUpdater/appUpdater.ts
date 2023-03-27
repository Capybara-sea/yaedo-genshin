import { useDiscreteApi } from '@/hooks'
import { NotificationApiInjection } from 'naive-ui/es/notification/src/NotificationProvider'

export class AppUpdater {
  notification: Ref<NotificationApiInjection>

  constructor() {
    const { notification } = useDiscreteApi()
    this.notification = notification
  }

  error(event: Electron.IpcRendererEvent, message: string, error: Error): void {
    // something
    console.log(event, message, error)
  }

  downloaded(event: Electron.IpcRendererEvent) {
    console.log(event)
    this.notification.value.info({
      title: '有新的版本',
    })
  }
}
