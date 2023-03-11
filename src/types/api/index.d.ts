import type HelloApi from './helloApi'
import type AppData from './appData'
import type Setting from './setting'

export default interface API {
  HelloApi: HelloApi
  AppData: AppData
  Setting: Setting
}
