import { defineStore } from 'pinia'
import type { AppState, Theme } from './types'
import { defaultState } from './helper'

export const useAppStore = defineStore('app-store', {
  state: (): AppState => defaultState(),
  actions: {
    async init() {
      window.api.Setting.get<AppState>().then((settings) => {
        this.$state = settings
      })
    },

    setTheme(theme: Theme) {
      this.theme = theme
      window.api.Setting.set('theme', theme)
    },
  },
})
