import { AppDataType } from '../data/index'

export default interface AppData {
  hello(name: string): string
  get<T>(dataType: AppDataType): T
}
