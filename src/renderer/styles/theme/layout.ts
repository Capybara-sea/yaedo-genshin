import type { ThemeConfig } from './types'
import { bgSubColor } from './variable'

export const Layout: ThemeConfig<'Layout'> = {
  light: {
    siderColor: bgSubColor.light, // 边栏颜色
  },
  dark: {
    siderColor: bgSubColor.dark, // 边栏颜色
  },
}
