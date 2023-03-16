import type { AppDataType, AppData as IAppData } from '../data/index'

export default interface AppData {
  get(dataType: AppDataType): Promise<IAppData[AppDataType]>
}
