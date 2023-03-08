import BaseApi from './baseApi'

export default interface AppData extends BaseApi<'AppData'> {
  hello(name: string): string
}
