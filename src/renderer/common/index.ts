import { IpcListener } from './ipc'
import { AppUpdater } from './appUpdater'

export function setupIpcListener() {
  IpcListener.bind(new AppUpdater())
}
