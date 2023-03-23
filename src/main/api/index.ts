import { AppData } from './appData'
import { Settings } from './settings'
import { IpcMainProvider } from '../preload/ipcMainProvider'

export * from './appData'
export * from './settings'
export function bindIpcApi() {
  const ipcMainProvider = new IpcMainProvider()
  ipcMainProvider.register(new AppData())
  ipcMainProvider.register(new Settings())
}
