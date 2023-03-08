import { contextBridge } from 'electron'
import { IpcRendererClient } from './ipcRendererClient'
import HelloApi from '../api/helloApi'
import AppData from '../api/appData'

contextBridge.exposeInMainWorld('api', {
  HelloApi: IpcRendererClient.gen(new HelloApi()),
  AppData: IpcRendererClient.gen(new AppData()),
})
