import { IpcBase } from './ipcBase'

export interface ListenerCallback {
  (callback: (response: any) => void, data: any): void
}

export class IpcListener extends IpcBase {
  private static instance: IpcListener

  // 注册列表，用于存放监听器。
  private listeners: Map<string, ListenerCallback> = new Map()

  constructor() {
    if (!IpcListener.instance) {
      super()
      window.api.ipcListener((event, channel, args) => {
        this.dispenser(event, channel, args)
      })
      IpcListener.instance = this
    }
    return IpcListener.instance
  }

  private dispenser(event: Electron.IpcRendererEvent, channel: string, data: any) {
    const callback = (res: any): void => event.sender.send(channel, res)

    const listener = this.listeners.get(channel)

    if (listener) listener(callback, data)
  }

  static bind(namespace: string, instance: object) {
    new IpcListener().bind(namespace, instance)
  }

  bind(namespace: string, instance: object) {
    const methods = IpcListener.getMethodKeys(instance)
    console.log(namespace, IpcListener.getMethodKeys(instance))
    methods.forEach((method) => {
      const key = IpcListener.getKey(namespace, method)

      // 创建一个箭头函数，使得this指向当前实例
      const listenerCallback: ListenerCallback = (callback, message) => {
        return (instance as any)[method](callback, message)
      }

      this.listeners.set(key, listenerCallback)
    })
  }
}
