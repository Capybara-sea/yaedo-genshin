import type { GlobalThemeOverrides } from 'naive-ui'
import { useAppStore } from '@/store'
import { useOsTheme, darkTheme } from 'naive-ui'
import { computed, watch } from 'vue'
import { customDarkTheme, customLightTheme } from '@/styles/theme'

export function useTheme() {
  const appStore = useAppStore()

  // TODO 和主进程通信，获取系统主题
  const OsTheme = useOsTheme()

  const isDark = computed(() => {
    if (appStore.theme === 'auto') {
      return OsTheme.value === 'dark'
    } else {
      return appStore.theme === 'dark'
    }
  })

  const theme = computed(() => {
    return isDark.value ? darkTheme : undefined
  })

  const themeOverrides = computed<GlobalThemeOverrides>(() => {
    return isDark.value ? customDarkTheme : customLightTheme
  })

  watch(
    () => isDark.value,
    (dark) => {
      if (dark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    { immediate: true }
  )

  return { theme, themeOverrides }
}
