import type { Character } from '@/types'

import { ref, computed } from 'vue'
import { calcStatsCharacter } from '@/utils/calc'

export function useStats(selectedCharacter: Character | undefined) {
  // 突破等级
  const ascensionList = [20, 40, 50, 60, 70, 80]

  // 角色属性计算器
  const statsCalculator = computed(() => {
    if (!selectedCharacter) return undefined
    return calcStatsCharacter(selectedCharacter)
  })

  // 拖动条数据
  const currentLevelSliderValue = ref<number>(1)

  // 计算后的拖动条数据
  const calculatedLevelSlider = computed<{ level: number; ascension: '+' | '-'; str: string }>(
    () => {
      let tempLevel = currentLevelSliderValue.value
      let ascensionCount = 0
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
    if (!statsCalculator.value)
      return { level: 0, ascension: 0, hp: 0, attack: 0, defense: 0, specialized: 0 }
    const { level, ascension } = calculatedLevelSlider.value
    const { hp, attack, defense, specialized } = statsCalculator.value(level, ascension) || {}
    return {
      level,
      ascension,
      hp: Math.round(hp || 0),
      attack: Math.round(attack || 0),
      defense: Math.round(defense || 0),
      specialized: Math.round(specialized || 0),
    }
  })

  const marks: Record<number, string> = {}
  ascensionList.forEach((ascension, i) => {
    marks[ascension + i + 1] = `${ascension}+`
  })

  const sliderConfig = {
    min: 1,
    max: 96,
    marks,
  }

  return {
    stats,
    sliderConfig,
    calculatedLevelSlider,
    currentLevelSliderValue,
  }
}
