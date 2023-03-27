import { createDiscreteApi } from 'naive-ui'
import { useTheme } from '@/hooks'

export function useDiscreteApi() {
  const { theme, themeOverrides } = useTheme()

  const config = computed(() => ({
    configProviderProps: {
      theme: theme.value,
      themeOverrides: themeOverrides.value,
    },
  }))

  const message = computed(() => {
    return createDiscreteApi(['message'], config.value).message
  })
  const dialog = computed(() => {
    return createDiscreteApi(['dialog'], config.value).dialog
  })
  const notification = computed(() => {
    return createDiscreteApi(['notification'], config.value).notification
  })
  const loadingBar = computed(() => {
    return createDiscreteApi(['loadingBar'], config.value).loadingBar
  })

  return { message, dialog, notification, loadingBar }
}
