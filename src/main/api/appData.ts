import type { IpcMainInvokeEvent } from 'electron'
import type { AppDataType } from '../../types/data'
import DataManager from '../inject/dataManager'

export default class AppData {
  async hello(e: IpcMainInvokeEvent, name: string) {
    return `Hello ${name}`
  }

  async get(e: IpcMainInvokeEvent, dataType: AppDataType) {
    console.warn(
      `%c vue-devtools %c Detected Vue v2.6.11 %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'
    )
    return DataManager.init().get(dataType)
  }
}
