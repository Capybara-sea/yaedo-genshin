import { contextBridge } from 'electron'
import { IpcRendererClient } from './ipcRendererClient'
import AppData from '../api/appData'
import Setting from '../api/setting'

contextBridge.exposeInMainWorld('api', {
  AppData: IpcRendererClient.gen(AppData),
  Setting: IpcRendererClient.gen(Setting),
})
