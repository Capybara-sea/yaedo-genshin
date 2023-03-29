import { IpcListener } from '@/common'
import { AppUpdater } from './appUpdater'

export function setupAppUpdater() {
  const appUpdater = new AppUpdater()
  IpcListener.bind('AppUpdater', appUpdater)
}
