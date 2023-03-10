import type { ThemeConfig } from './types'

export const common: ThemeConfig<'common'> = {
  light: {
    // baseColor: '', // 基本色 - 用于文字、图标、边框等
    primaryColor: '#39ac86', // 主色 - 用于按钮、链接等
    primaryColorHover: '#40bf95', // 主色 - 鼠标悬浮
    primaryColorPressed: '#389477', // 主色 - 鼠标按下
    // primaryColorSuppl: '#91d5ff', // 未知
    // textColor1: '#000', // 未知
    // textColor2: '#000' // 默认字体颜色
    // textColor3: '#000', // 未知
    // dividerColor: '#eee' // 分割线颜色
    // progressRailColor: '#0f0' // 进度条颜色
    // railColor: '#0f0' // 未知
    boxShadow1: 'red',
  },
  dark:{
  }
}
