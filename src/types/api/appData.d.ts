import type { AppDataType } from '../data/index'

export default interface AppData {
  get<T>(dataType: AppDataType): Promise<T>
}
