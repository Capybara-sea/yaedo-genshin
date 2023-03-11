import type { IpcMainInvokeEvent } from 'electron'
import type { AppDataType } from '../../types/data'
import DataManager from '../inject/dataManager'

export default class AppData {
  dataManager: DataManager

  constructor() {
    this.dataManager = DataManager.init()
  }

  async get(e: IpcMainInvokeEvent, dataType: AppDataType) {
    return this.dataManager.get(dataType)
  }
}
