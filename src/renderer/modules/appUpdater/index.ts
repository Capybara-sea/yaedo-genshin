import { IpcListener } from '@/modules'
import { AppUpdater } from './appUpdater'

export function setupAppUpdater() {
  const appUpdater = new AppUpdater()
  IpcListener.bind('AppUpdater', appUpdater)
}
