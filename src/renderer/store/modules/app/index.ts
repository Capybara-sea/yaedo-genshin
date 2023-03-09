import { defineStore } from 'pinia'
import type { AppState, Theme } from './types'
import { getLocalSetting } from './helper'

export const useAppStore = defineStore('app-store', {
  state: (): AppState => getLocalSetting(),
  actions: {
    // TODO: 主题切换后应该储存至本地
    // [ ] 1.主进程储存API
    // [ ] 2.渲染进程调用主进程API
    setTheme(theme: Theme) {
      this.theme = theme
    },
  },
})
