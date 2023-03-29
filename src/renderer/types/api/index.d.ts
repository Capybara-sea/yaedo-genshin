import type { AppData } from './appData'
import type { Settings } from './settings'
import type Electron from 'electron'

interface IpcListenerCallback {
  (event: Electron.IpcRendererEvent, channel: string, args: any[]): void
}

export interface API {
  ready2show: () => void
  ipcListener: (callback: IpcListenerCallback) => void

  AppData: AppData
  Settings: Settings

  version: {
    app: string
    electron: string
    node: string
    chrome: string
    v8: string
  }
}
