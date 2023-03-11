import type { IpcMainInvokeEvent } from 'electron'
import { ipcMain } from 'electron'
import IpcBase from './ipcBase'

export class IpcMainProvider extends IpcBase {
  private readonly clazzMap = new Map<string, object>()

  register(instance: object): void {
    const namespace = IpcMainProvider.getNamespace(instance)
    const methods = IpcMainProvider.getMethodKeys(instance)
    methods.forEach((method) => {
      const key = IpcMainProvider.getKey(namespace, method)
      // 创建一个箭头函数，使得this指向当前实例
      const handler = (e: IpcMainInvokeEvent, ...args: any[]) => {
        return instance[method](e, ...args)
      }
      ipcMain.handle(key, handler)
      console.log('[Register] ipcMain.handle: ', key)
    })
    this.clazzMap.set(namespace, instance)
  }

  unregister(instance: object): void {
    const namespace = IpcMainProvider.getNamespace(instance)
    const methods = IpcMainProvider.getMethodKeys(instance)
    methods.forEach((method) => {
      const key = IpcMainProvider.getKey(namespace, method)
      ipcMain.removeHandler(key)
    })
    this.clazzMap.delete(namespace)
  }
}
