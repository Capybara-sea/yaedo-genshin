import Path from 'path'
import { Common } from '../common'
import { readFile, writeFile } from '../utils/files'

export default class SettingsManager {
  path: string
  store: object

  constructor(options: { name: string }) {
    this.path = Path.join(Common.GET_APP_ROOT_PATH(), Common.APP_DATA_PATH, options.name)
    const temp = readFile(this.path) as string
    this.store = temp === '' ? {} : JSON.parse(temp)
  }

  set(key: string | object, value?: any) {
    if (typeof key === 'object') {
      // 如果直接是对象传入直接赋值
      writeFile(this.path, JSON.stringify(key)) // 这个时候key是value
    } else {
      // 如果是key value传入，先获取原来的值，然后赋值
      this.store[key] = value
      writeFile(this.path, JSON.stringify(this.store, null, 2))
    }
  }

  get(key?: string) {
    if (key) return this.store[key]
    else return this.store
  }
}
