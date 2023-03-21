import { AppData, AppDataType, Character, Material } from '@/types'
import { defineStore } from 'pinia'
import { defaultData } from './helper'

export const useAppDataStore = defineStore('appData-store', {
  state: (): AppData => defaultData(),
  getters: {
    getCharacterById:
      (state) =>
      (id: string): Character | undefined => {
        return state.characters.find((c) => c.id === id)
      },
    getMaterial:
      (state) =>
      (filterKey: keyof Material, filter: string | number): Material | undefined => {
        return state.materials.find((m) => m[filterKey] === filter)
      },
  },
  actions: {
    async init() {
      const appData = defaultData()
      // 遍历appData的所有属性，如果本地存储中没有对应的数据，则从本地文件中读取
      for (const key in appData) {
        const data = await window.api.AppData.get(key as AppDataType)
        if (data !== undefined) {
          ;(this as any)[key] = data
        }
      }
    },
  },
})
