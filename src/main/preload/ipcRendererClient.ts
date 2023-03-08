import { ipcRenderer } from 'electron'
import IpcBase from './ipcBase'

export class IpcRendererClient extends IpcBase {
  static gen<T extends Function>(api: T): {
    [key: string]: (...args: any[]) => Promise<any>
  } {
    const client = {}
    const namespace = IpcRendererClient.getNamespace(api.prototype)
    const methods = IpcRendererClient.getMethodKeysByPrototype(api.prototype)
    methods.forEach((method) => {
      client[method] = function (...args: any[]) {
        return ipcRenderer.invoke(`${namespace}.${method.toString()}`, ...args)
      }
    })
    return client
  }
}
