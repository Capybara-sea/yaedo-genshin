import type { ComputedRef } from 'vue'
import type { Character } from '@/types'

import { ref, computed } from 'vue'
import { calcStatsCharacter } from '@/utils/calc'

export function useStats(selectedCharacter: ComputedRef<Character | undefined>) {
  // 角色属性计算器
  const statsCalculator = computed(() => {
    if (!selectedCharacter.value) return undefined
    return calcStatsCharacter(selectedCharacter.value)
  })

  // 拖动条数据
  const currentLevelSliderValue = ref<number>(1)

  // 计算后的拖动条数据
  const calculatedLevelSlider = computed<{ level: number; ascension: '+' | '-'; str: string }>(
    () => {
      let tempLevel = currentLevelSliderValue.value
      let ascensionCount = 0
      const ascensionList = [20, 40, 50, 60, 70, 80]
      ascensionList.forEach((ascension) => {
        if (tempLevel > ascension) {
          ascensionCount++
          tempLevel--
        }
      })
      const isAscension = ascensionList[ascensionCount - 1] == tempLevel
      return {
        level: tempLevel,
        ascension: isAscension ? '+' : '-',
        str: `${tempLevel}${isAscension ? '+' : ''}`,
      }
    }
  )

  // 角色属性
  const stats = computed(() => {
    if (!statsCalculator.value) return undefined
    const { level, ascension } = calculatedLevelSlider.value
    return statsCalculator.value(level, ascension)
  })

  return {
    currentLevelSliderValue,
    calculatedLevelSlider,
    stats,
  }
}
