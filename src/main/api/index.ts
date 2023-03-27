import { AppData } from './appData'
import { Settings } from './settings'
import { IpcMainProvider } from '../preload/ipcMainProvider'

export * from './appData'
export * from './settings'

const ipcMainProvider = new IpcMainProvider()
export function bindIpcHandleApi() {
  ipcMainProvider.handleRegister(new AppData())
  ipcMainProvider.handleRegister(new Settings())
}