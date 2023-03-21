import type { IpcMainInvokeEvent } from 'electron'
import DataManager from '../modules/dataManager'

export default class AppData {
  dataManager: DataManager

  constructor() {
    this.dataManager = DataManager.init()
  }

  async get(e: IpcMainInvokeEvent, dataType: string) {
    return this.dataManager.get(dataType)
  }
}
