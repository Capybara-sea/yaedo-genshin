import SettingsManager from '../modules/settingsManager'
import { Common } from '../common'

export class Settings {
  private store: SettingsManager

  constructor() {
    this.store = new SettingsManager({ name: Common.USER_SETTINGS })
  }

  async set(e: Electron.IpcMainInvokeEvent, key: string | object, value: any) {
    if (typeof key === 'object') {
      this.store.set(key)
      return this.store.store
    } else {
      return this.store.set(key, value)
    }
  }

  async get(e: Electron.IpcMainInvokeEvent, key?: string) {
    if (key) return this.store.get(key)
    else return this.store.store
  }

  openFolder(e: Electron.IpcMainInvokeEvent) {
    const { spawn } = require('child_process')
    const { join } = require('path')

    const folder = join(Common.GET_APP_ROOT_PATH())
    if (Common.os === 'win32') spawn('explorer', [folder])
    else if (Common.os === 'darwin') spawn('open', [folder])
  }
}
