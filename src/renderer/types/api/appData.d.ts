import type { AppDataType, AppData as IAppData } from '@/types/data'

export interface AppData {
  get<T extends AppDataType>(dataType: T): Promise<IAppData[T]>
}
