import { ipcMain } from 'electron'

export class IpcMainProvider {
  private readonly clazzMap = new Map<string, object>()

  /**
   * 计算主进程监听的 key
   * @param namespace
   * @param method
   * @private
   */
  private static getKey(namespace: string, method: PropertyKey) {
    return namespace + '.' + method.toString()
  }

  /**
   * 获取类的方法
   * @param instance
   * @returns
   */
  private static getMethodKeys(instance: object) {
    const prototype = Object.getPrototypeOf(instance)
    const Keys = (Reflect.ownKeys(prototype) || []) as PropertyKey[]
    return Keys.filter((key) =>
      key === 'constructor' ? false : typeof prototype[key] === 'function'
    )
  }

  register(instance: object): void {
    const namespace = instance['namespace']
    const methods = IpcMainProvider.getMethodKeys(instance)
    methods.forEach((method) => {
      const key = IpcMainProvider.getKey(namespace, method)
      ipcMain.handle(key, instance[method])
      console.log('Register ipcMain.handle: ', key)
    })
    this.clazzMap.set(namespace, instance)
  }

  unregister(namespace: string): void {
    const instance = this.clazzMap.get(namespace)
    if (instance === undefined) return
    const methods = IpcMainProvider.getMethodKeys(instance)
    methods.forEach((method) => {
      const key = IpcMainProvider.getKey(namespace, method)
      ipcMain.removeHandler(key)
    })
    this.clazzMap.delete(namespace)
  }
}
