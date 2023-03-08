export default class IpcBase {
  /**
   * 计算主进程监听的 key
   * @param namespace
   * @param method
   * @private
   */
  protected static getKey(namespace: string, method: PropertyKey) {
    return namespace + '.' + method.toString()
  }

  /**
   * 获取类的方法数组 从 instance
   * @param instance
   */
  protected static getMethodKeys(instance: object) {
    const prototype = Object.getPrototypeOf(instance)
    return this.getMethodKeysByPrototype(prototype)
  }

  /**
   * 获取类的方法数组 从 prototype
   * @param prototype
   */
  protected static getMethodKeysByPrototype(prototype: object) {
    const Keys = (Reflect.ownKeys(prototype) || []) as PropertyKey[]
    return Keys.filter((key) =>
      key === 'constructor' ? false : typeof prototype[key] === 'function'
    )
  }

  /**
   * 获取类的命名空间
   * @param instance instance or class.prototype
   */
  protected static getNamespace(instance: object): string {
    return instance.constructor.name
  }
}
