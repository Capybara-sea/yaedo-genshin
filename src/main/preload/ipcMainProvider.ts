import type { IpcMainInvokeEvent } from 'electron'
import { ipcMain } from 'electron'
import IpcBase from './ipcBase'
import Logger from '../utils/logger'
const logger = new Logger('IpcMainProvider')

export class IpcMainProvider extends IpcBase {
  static instance: IpcMainProvider
  private readonly instanceMap = new Map<string, object>()
  private window: Electron.BrowserWindow | null = null

  constructor() {
    super()
    if (IpcMainProvider.instance) {
      return IpcMainProvider.instance
    }
    IpcMainProvider.instance = this
  }

  handleRegister(instance: object): void {
    const namespace = IpcMainProvider.getNamespace(instance)
    const methods = IpcMainProvider.getMethodKeys(instance)
    methods.forEach((method) => {
      const key = IpcMainProvider.getKey(namespace, method)
      // 创建一个箭头函数，使得this指向当前实例
      const handler = (e: IpcMainInvokeEvent, ...args: any[]) => {
        return instance[method](e, ...args)
      }
      ipcMain.handle(key, handler)
      logger.info(`ipcMain.handleRegister: ${key}`)
    })
    this.instanceMap.set(namespace, instance)
  }

  unHandleRegister(instance: object): void {
    const namespace = IpcMainProvider.getNamespace(instance)
    const methods = IpcMainProvider.getMethodKeys(instance)
    methods.forEach((method) => {
      const key = IpcMainProvider.getKey(namespace, method)
      ipcMain.removeHandler(key)
    })
    this.instanceMap.delete(namespace)
  }

  sendRegister(window: Electron.BrowserWindow): void {
    this.window = window
    logger.info('ipcMain.sendRegister')
  }

  static sender(namespace: string) {
    return (method: string, ...args: any[]) => {
      new IpcMainProvider().send(IpcMainProvider.getKey(namespace, method), ...args)
    }
  }

  send(channel: string, ...args: any[]): void {
    if (this.window === null) {
      logger.error('ipcMain.send: window is not registered')
      return
    }
    this.window.webContents.send(IpcMainProvider.mainWindowName, channel, args)
  }
}
