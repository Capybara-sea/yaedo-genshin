import { IpcMainInvokeEvent } from 'electron'
import DataManager from '../inject/dataManager'

const dataManager = DataManager.init()

export default class AppData {
  namespace = 'AppData'

  async hello(e: IpcMainInvokeEvent, name: string) {
    return `Hello ${name}`
  }

  async get(e: IpcMainInvokeEvent, name: string) {

    return `Hello ${name}`
  }
}
