import { contextBridge, ipcRenderer } from 'electron'
import { IpcRendererClient } from './ipcRendererClient'
import AppData from '../api/appData'
import Setting from '../api/setting'

contextBridge.exposeInMainWorld('api', {
  ready2show: () => ipcRenderer.send('ready-to-show'),

  AppData: IpcRendererClient.gen(AppData),
  Setting: IpcRendererClient.gen(Setting),
})
