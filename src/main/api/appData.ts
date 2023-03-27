import DataManager from '../modules/dataManager'

export class AppData {
  dataManager: DataManager

  constructor() {
    this.dataManager = DataManager.init()
  }

  async get(e: Electron.IpcMainInvokeEvent, dataType: string) {
    return this.dataManager.get(dataType)
  }
}
