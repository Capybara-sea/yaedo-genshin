import { contextBridge, ipcRenderer } from 'electron'
import { IpcRendererClient } from './ipcRendererClient'
import { AppData } from '../api'
// import { Setting } from '../api'

contextBridge.exposeInMainWorld('api', {
  ready2show: () => ipcRenderer.send('ready-to-show'),

  AppData: IpcRendererClient.gen(AppData),
  // Setting: IpcRendererClient.gen(Setting),
})
