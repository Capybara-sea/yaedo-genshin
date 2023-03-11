import { contextBridge } from 'electron'
import { IpcRendererClient } from './ipcRendererClient'
import HelloApi from '../api/helloApi'
import AppData from '../api/appData'
import Setting from '../api/setting'

contextBridge.exposeInMainWorld('api', {
  HelloApi: IpcRendererClient.gen(HelloApi),
  AppData: IpcRendererClient.gen(AppData),
  Setting: IpcRendererClient.gen(Setting),
})
