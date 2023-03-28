import { ipcRenderer } from 'electron'
import IpcBase from './ipcBase'

type IpcRendererApi = {
  [key: PropertyKey]: (...args: any[]) => Promise<any>
}

export class IpcRendererClient extends IpcBase {
  static invokeRegister(api: any): IpcRendererApi {
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

  static onRegister() {
    return (callback) =>
      ipcRenderer.on(IpcRendererClient.mainWindowName, (event, channel, data) => {
        console.log('[Client] ipcRenderer.on', channel, data)
        callback(event, channel, data)
      })
  }
}
