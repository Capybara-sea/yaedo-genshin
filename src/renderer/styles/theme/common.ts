import type { ThemeConfig } from './types'
import { mainColor, bgColor, bgSubColor } from './variable'

export const common: ThemeConfig<'common'> = {
  all: {
    fontWeight: '400',
    fontWeightStrong: '600',
  },
  light: {
    bodyColor: bgColor.light, // 主体颜色-layout的背景颜色
    cardColor: bgColor.light, // 主体颜色-一般样式的背景颜色

    primaryColor: mainColor.light, // 主色 - 用于按钮、链接等
    popoverColor: bgSubColor.light, // 弹出层颜色
  },
  dark: {
    bodyColor: bgColor.dark, // 主体颜色-layout的背景颜色
    cardColor: bgColor.dark, // 主体颜色-一般样式的背景颜色

    primaryColor: mainColor.dark, // 主色 - 用于按钮、链接等
    popoverColor: bgSubColor.dark, // 弹出层颜色
  },
}
