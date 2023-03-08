import { ipcRenderer } from 'electron'
import IpcBase from './ipcBase'

export class IpcRendererClient extends IpcBase {
  static gen(api: any): {
    [key: string]: (...args: any[]) => Promise<any>
  } {
    const client = {}
    const namespace = IpcRendererClient.getNamespace(api.prototype)
    const methods = IpcRendererClient.getMethodKeysByPrototype(api.prototype)
    methods.forEach((method) => {
      client[method] = function (...args: any[]) {
        console.log('[Client] ipcRenderer.invoke', IpcRendererClient.getKey(namespace, method), args)
        return ipcRenderer.invoke(IpcRendererClient.getKey(namespace, method), ...args)
      }
    })
    return client
  }
}
