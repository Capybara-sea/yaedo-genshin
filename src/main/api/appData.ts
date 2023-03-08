import { IpcMainInvokeEvent } from 'electron'
import DataManager from '../inject/dataManager'

export default class AppData {
  dataManager: DataManager

  constructor() {
    this.dataManager = DataManager.init()
  }

  async hello(e: IpcMainInvokeEvent, name: string) {
    return `Hello ${name}`
  }

  async get(e: IpcMainInvokeEvent, name: string) {
    return `Hello ${name}`
  }
}
