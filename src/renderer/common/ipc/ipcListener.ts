import { IpcBase } from './ipcBase'

export class IpcListener extends IpcBase {
  private static instance: IpcListener
  // 注册列表
  private listenerMap: Map<string, (...arg: any[]) => void> = new Map()

  constructor() {
    if (!IpcListener.instance) {
      super()
      window.api.ipcListener((event, channel, args) => {
        this.listener(event, channel, args)
      })
    }
    return IpcListener.instance
  }

  private listener(event: Electron.IpcRendererEvent, channel: string, args: any[]) {
    const callback = this.listenerMap.get(channel)
    if (callback) {
      callback(event, args)
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
      this.listenerMap.set(key, (event: Electron.IpcRendererEvent, args: any[]) => {
        return (instance as any)[method](event, ...args)
      })
    })
  }
}
