import type { ThemeType, ThemeConfigMap, ThemeConfigKeys, GlobalThemeOverrides } from './types'

import { common } from './common'
import { Layout } from './layout'

const themeConfigMap: ThemeConfigMap = {
  common,
  Layout,
}

function margeTheme(theme: Exclude<ThemeType, 'all'>) {
  const themeConfig: GlobalThemeOverrides = {}
  for (const key in themeConfigMap) {
    if (Object.prototype.hasOwnProperty.call(themeConfigMap, key)) {
      const config = themeConfigMap[key as ThemeConfigKeys]
      if (config) {
        ;(themeConfig as any)[key] = { ...config.all, ...config[theme] }
      }
    }
  }
  return themeConfig
}

export const customDarkTheme: GlobalThemeOverrides = margeTheme('dark')
export const customLightTheme: GlobalThemeOverrides = margeTheme('light')
