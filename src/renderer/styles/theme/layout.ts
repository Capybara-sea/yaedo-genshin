import type { ThemeConfig } from './types'

export const Layout: ThemeConfig<'Layout'> = {
  light: {
    color: '#fff', // 主体颜色
    siderColor: '#f6f6f7', // 边栏颜色
  },
  dark: {
    color: '#2b2b45',
    siderColor: '#1d1d30',
  },
}
