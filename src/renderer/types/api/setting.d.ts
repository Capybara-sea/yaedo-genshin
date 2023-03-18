export interface Setting {
  /**
   * 将会覆盖原有的数据
   * @param object
   */
  set(value: object): Promise<any>
  /**
   * 设置单个数据
   * @param key
   * @param value
   */
  set(key: string, value: any): Promise<any>
  /**
   * 获取数据
   * @param key 可选，不传则返回所有数据
   */
  get<T = any>(key?: string): Promise<T>
}
