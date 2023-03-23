import type { IpcMainInvokeEvent } from 'electron'
import SettingsManager from '../modules/settingsManager'
import { Common } from '../common'

export class Settings {
  private store: SettingsManager

  constructor() {
    this.store = new SettingsManager({ name: Common.USER_SETTINGS })
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
