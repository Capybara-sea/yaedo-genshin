import { contextBridge, ipcRenderer } from 'electron'
import { IpcRendererClient } from './ipcRendererClient'
import { AppData } from '../api/appData'
import { Settings } from '../api/settings'

contextBridge.exposeInMainWorld('api', {
  ready2show: () => ipcRenderer.send('ready-to-show'),
  ipcListener: IpcRendererClient.onRegister(),

  AppData: IpcRendererClient.invokeRegister(AppData),
  Settings: IpcRendererClient.invokeRegister(Settings),
})
