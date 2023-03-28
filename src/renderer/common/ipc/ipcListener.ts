import { IpcBase } from './ipcBase'

export class IpcListener extends IpcBase {
  private static instance: IpcListener
  // 注册列表
  private listenerMap: Map<string, (...arg: any[]) => void> = new Map()

  constructor() {
    if (!IpcListener.instance) {
      super()
      window.api.ipcListener((event, channel, args) => {
        this.dispenser(event, channel, args)
      })
    }
    return IpcListener.instance
  }

  private dispenser(event: Electron.IpcRendererEvent, channel: string, data: any) {
    const listener = this.listenerMap.get(channel)
    const callback = (res: any): void => {
      event.sender.send(channel, res)
    }
    if (listener) {
      listener(callback, data)
    }
  }

  static bind(instance: object) {
    new IpcListener().bind(instance)
  }

  bind(instance: object) {
    const namespace = IpcListener.getNamespace(instance)
    const methods = IpcListener.getMethodKeys(instance)
    methods.forEach((method) => {
      const key = IpcListener.getKey(namespace, method)
      // 创建一个箭头函数，使得this指向当前实例
      this.listenerMap.set(key, (callback: () => void, data: any) => {
        return (instance as any)[method](callback, data)
      })
    })
  }
}
