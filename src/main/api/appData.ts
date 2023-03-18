import type { IpcMainInvokeEvent } from 'electron'
import type { AppDataType } from '../../renderer/types/data'
import DataManager from '../modules/dataManager'

export default class AppData {
  dataManager: DataManager

  constructor() {
    this.dataManager = DataManager.init()
  }

  async get(e: IpcMainInvokeEvent, dataType: AppDataType) {
    return this.dataManager.get(dataType)
  }
}
