import type { GlobalThemeOverrides as NGlobalThemeOverrides } from 'naive-ui'

export type ThemeType = 'all' | 'light' | 'dark'
export type GlobalThemeOverrides = NGlobalThemeOverrides
export type ThemeConfigKeys = keyof GlobalThemeOverrides
export type ThemeConfig<T extends ThemeConfigKeys> = Partial<
  Record<ThemeType, GlobalThemeOverrides[T]>
>
export type ThemeConfigMap = Partial<Record<ThemeConfigKeys, ThemeConfig<ThemeConfigKeys>>>
