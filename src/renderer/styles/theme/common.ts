import type { ThemeConfig } from './types'

export const common: ThemeConfig<'common'> = {
  all:{
    fontWeight: '400',
    fontWeightStrong: '600',
  },
  light: {
    bodyColor: '#ffffff', // 主体颜色-layout的背景颜色
    cardColor: '#ffffff', // 主体颜色-一般样式的背景颜色

    primaryColor: '#39ac86', // 主色 - 用于按钮、链接等
    primaryColorHover: '#40bf95', // 主色 - 鼠标悬浮
    primaryColorPressed: '#389477', // 主色 - 鼠标按下
  },
  dark: {
    bodyColor: '#2d2d4b', // 主体颜色-layout的背景颜色
    cardColor: '#2d2d4b', // 主体颜色-一般样式的背景颜色
  },
}
