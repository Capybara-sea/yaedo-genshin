import { AppData } from './appData'
// import { Setting } from './setting'
import { IpcMainProvider } from '@/preload/ipcMainProvider'

export * from './appData'
// export * from './setting'
export function bindIpcApi() {
  const ipcMainProvider = new IpcMainProvider()
  ipcMainProvider.register(new AppData())
  // ipcMainProvider.register(new Setting())
}
