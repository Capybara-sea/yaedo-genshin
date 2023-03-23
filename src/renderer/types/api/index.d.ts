import type { AppData } from './appData'
import type { Settings } from './settings'

export interface API {
  ready2show: () => void

  AppData: AppData
  Settings: Settings
}
