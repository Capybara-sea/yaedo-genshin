import { contextBridge, ipcRenderer } from 'electron'
import { IpcRendererClient } from './ipcRendererClient'
import { AppData } from '../api'
import { Settings } from '../api'

contextBridge.exposeInMainWorld('api', {
  ready2show: () => ipcRenderer.send('ready-to-show'),

  AppData: IpcRendererClient.gen(AppData),
  Settings: IpcRendererClient.gen(Settings),
})
