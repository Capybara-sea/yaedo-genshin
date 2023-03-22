import type { IpcMainInvokeEvent } from 'electron'
import SettingManager from '../modules/settingManager'
import { Common } from '../common'

export class Setting {
  private store: SettingManager

  constructor() {
    this.store = new SettingManager({ name: Common.USER_SETTING })
  }

  async set(e: IpcMainInvokeEvent, key: string | object, value: any) {
    if (typeof key === 'object') {
      this.store.set(key)
      return this.store.store
    } else {
      return this.store.set(key, value)
    }
  }

  async get(e: IpcMainInvokeEvent, key?: string) {
    if (key) return this.store.get(key)
    else return this.store.store
  }
}
