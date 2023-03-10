import type { GlobalThemeOverrides } from 'naive-ui'

type ThemeType = 'all' | 'light' | 'dark'
type ThemeConfigKeys = keyof GlobalThemeOverrides
type ThemeConfig<T extends ThemeConfigKeys> = Partial<Record<ThemeType, GlobalThemeOverrides[T]>>
type ThemeConfigMap = Partial<Record<ThemeConfigKeys, ThemeConfig<ThemeConfigKeys>>>

export { GlobalThemeOverrides, ThemeType, ThemeConfig, ThemeConfigMap, ThemeConfigKeys }
