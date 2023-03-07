import { IpcMainInvokeEvent } from 'electron'

class HelloApi {
  namespace = 'HelloApi'
  async hello(e: IpcMainInvokeEvent, name: string) {
    return `Hello ${name}`
  }
}

export default HelloApi
