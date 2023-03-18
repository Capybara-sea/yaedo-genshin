import type { AppData } from './appData'
import type { Setting } from './setting'

export interface API {
  ready2show: () => void

  AppData: AppData
  Setting: Setting
}
