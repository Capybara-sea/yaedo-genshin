import type { DiscreteApi } from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import { useTheme } from '@/hooks'

// 单例模式，保证api是同一个实例
let discreteApiInstance: {
  message: ComputedRef<DiscreteApi['message']>
  dialog: ComputedRef<DiscreteApi['dialog']>
  notification: ComputedRef<DiscreteApi['notification']>
  loadingBar: ComputedRef<DiscreteApi['loadingBar']>
} | null = null

export function useDiscreteApi() {
  if (discreteApiInstance === null) {
    const { theme, themeOverrides } = useTheme()

    const config = computed(() => ({
      configProviderProps: {
        theme: theme.value,
        themeOverrides: themeOverrides.value,
      },
    }))

    discreteApiInstance = {
      message: computed(() => {
        return createDiscreteApi(['message'], config.value).message
      }),

      dialog: computed(() => {
        return createDiscreteApi(['dialog'], config.value).dialog
      }),

      notification: computed(() => {
        return createDiscreteApi(['notification'], config.value).notification
      }),

      loadingBar: computed(() => {
        return createDiscreteApi(['loadingBar'], config.value).loadingBar
      }),
    }
  }

  return discreteApiInstance
}
