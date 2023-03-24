import type { ThemeConfig } from './types'
import { mainColor } from './variable'

export const Switch: ThemeConfig<'Switch'> = {
  light: {
    railColorActive: mainColor.light,
  },
  dark: {
    railColorActive: mainColor.dark,
  },
}
