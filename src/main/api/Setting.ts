import type { IpcMainInvokeEvent } from 'electron'
import Store from 'electron-store'
import { Common } from '../common'

export default class Setting {
  private store: Store

  constructor() {
    this.store = new Store({ name: Common.USER_SETTING })
  }

  async set(e: IpcMainInvokeEvent, key: string, value: any) {
    return this.store.set(key, value)
  }

  async get(e: IpcMainInvokeEvent, key: string) {
    return this.store.get(key)
  }
}
