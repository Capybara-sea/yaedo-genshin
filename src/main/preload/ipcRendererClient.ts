import { ipcRenderer } from 'electron'
import IpcBase from './ipcBase'

type IpcRendererApi = {
  [key: PropertyKey]: (...args: any[]) => Promise<any>
}

export class IpcRendererClient extends IpcBase {
  static gen(api: any): IpcRendererApi {
    const client: IpcRendererApi = {}
    const namespace = IpcRendererClient.getNamespace(api.prototype)
    const methods = IpcRendererClient.getMethodKeysByPrototype(api.prototype)

    methods.forEach((method) => {
      const key = IpcRendererClient.getKey(namespace, method)

      client[method] = function (...args: any[]) {
        console.log('[Client] ipcRenderer.invoke', key, ...args)
        return ipcRenderer.invoke(key, ...args)
      }
    })
    return client
  }
}
