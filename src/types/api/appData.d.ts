import type { AppDataType, AppData as IAppData } from '../data/index'

export default interface AppData {
  get<T extends AppDataType>(dataType: T): Promise<IAppData[T]>
}
