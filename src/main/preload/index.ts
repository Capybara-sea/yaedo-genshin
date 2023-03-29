import { contextBridge, ipcRenderer } from 'electron'
import { IpcRendererClient } from './ipcRendererClient'
import { Common } from '../common'
import { AppData } from '../api/appData'
import { Settings } from '../api/settings'

contextBridge.exposeInMainWorld('api', {
  ready2show: () => ipcRenderer.send('ready-to-show'),
  ipcListener: IpcRendererClient.onRegister(),

  AppData: IpcRendererClient.invokeRegister(AppData),
  Settings: IpcRendererClient.invokeRegister(Settings),

  // 常量
  version: {
    app: Common.APP_VERSION,
    electron: process.versions.electron,
    node: process.versions.node,
    chrome: process.versions.chrome,
  },
})
