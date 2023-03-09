import type { AppDataType } from '../data/index'

export default interface AppData {
  hello(name: string): Promise<string>
  get<T>(dataType: AppDataType): Promise<T>
}
