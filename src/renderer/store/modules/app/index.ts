import { defineStore } from 'pinia'
import type { AppState } from './types'
import { getLocalSetting } from './helper'

export const useAppStore = defineStore('app-store', {
  state: (): AppState => getLocalSetting(),
  actions: {
    // ...
  },
})
