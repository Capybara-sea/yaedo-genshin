import { contextBridge } from 'electron'
import HelloApi from '../handlers/helloApi'
import { IpcRendererClient } from './ipcRendererClient'

contextBridge.exposeInMainWorld('api', {
  HelloApi: IpcRendererClient.gen(new HelloApi()),
})
