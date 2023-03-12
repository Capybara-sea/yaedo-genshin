import type AppData from './appData'
import type Setting from './setting'

export default interface API {
  ready2show: () => void

  AppData: AppData
  Setting: Setting
}
