import type { ThemeConfig } from './types'
import { mainColor, bgColor } from './variable'

export const common: ThemeConfig<'common'> = {
  all: {
    fontWeight: '400',
    fontWeightStrong: '600',
  },
  light: {
    bodyColor: bgColor.light, // 主体颜色-layout的背景颜色
    cardColor: bgColor.light, // 主体颜色-一般样式的背景颜色

    primaryColor: mainColor.light, // 主色 - 用于按钮、链接等
    // primaryColorHover: '#40bf95', // 主色 - 鼠标悬浮
    // primaryColorPressed: '#389477', // 主色 - 鼠标按下
  },
  dark: {
    bodyColor: bgColor.dark, // 主体颜色-layout的背景颜色
    cardColor: bgColor.dark, // 主体颜色-一般样式的背景颜色

    primaryColor: mainColor.dark, // 主色 - 用于按钮、链接等
  },
}
