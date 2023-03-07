import { ipcRenderer } from 'electron'

function getMethodKeys(instance: object) {
  const prototype = Object.getPrototypeOf(instance)
  const Keys = (Reflect.ownKeys(prototype) || []) as PropertyKey[]
  return Keys.filter((key) =>
    key === 'constructor' ? false : typeof prototype[key] === 'function'
  )
}

export class IpcRendererClient {
  /**
   * 生成一个客户端实例
   * @param namespace
   */
  static gen(instance: object): any {
    const client = {}
    const methods = getMethodKeys(instance)
    methods.forEach((method) => {
      client[method] = function (...args: any[]) {
        return ipcRenderer.invoke(`${instance['namespace']}.${method.toString()}`, ...args)
      }
    })
    return client
  }
}
