import type { IpcMainInvokeEvent } from 'electron'
import { ipcMain } from 'electron'
import IpcBase from './ipcBase'
import Logger from '../utils/logger'
const logger = new Logger('IpcMainProvider')

export class IpcMainProvider extends IpcBase {
  private readonly instanceMap = new Map<string, object>()

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
      logger.info(`ipcMain.handle: ${key}`)
    })
    this.instanceMap.set(namespace, instance)
  }

  unregister(instance: object): void {
    const namespace = IpcMainProvider.getNamespace(instance)
    const methods = IpcMainProvider.getMethodKeys(instance)
    methods.forEach((method) => {
      const key = IpcMainProvider.getKey(namespace, method)
      ipcMain.removeHandler(key)
    })
    this.instanceMap.delete(namespace)
  }
}
