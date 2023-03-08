import { IpcMainInvokeEvent } from 'electron'

export default class HelloApi {
  async hello(e: IpcMainInvokeEvent, name: string) {
    return `Hello ${name}`
  }
}
