import type { Character } from '@/types'

import { ref, computed } from 'vue'
import { calcStatsCharacter } from '@/utils/calc'
import { SpecializedProperty } from '@/types/data/characters'

export function useStats(character: Character) {
  // 突破等级
  const ascensionList = [20, 40, 50, 60, 70, 80]

  // 突破等级标签
  const marks: Record<number, string> = {}
  ascensionList.forEach((ascension, i) => {
    marks[ascension + i + 1] = `${ascension}+`
  })

  // 拖动条配置
  const sliderConfig = {
    min: 1,
    max: 96,
    marks,
  }

  // 角色属性计算器
  const statsCalculator = computed(() => {
    if (!character) return undefined
    return calcStatsCharacter(character)
  })

  // 拖动条数据
  const currentLevelSliderValue = ref<number>(sliderConfig.max)

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
    if (!statsCalculator.value) return undefined
    const { level, ascension } = calculatedLevelSlider.value
    return statsCalculator.value(level, ascension)
  })

  // 角色属性格式化
  const statsFormat = computed(() => {
    if (!stats.value) return undefined
    const { hp, attack, defense, specialized } = stats.value
    const specializedCode = character?.stats.specialized!
    return {
      level: stats.value.level,
      ascension: stats.value.ascension,
      hp: Math.round(hp || 0),
      attack: Math.round(attack || 0),
      defense: Math.round(defense || 0),
      specialized: Math.round((specialized || 0) * 1000) / 10,
      specializedName: (SpecializedProperty as any)[specializedCode] || '未知',
    }
  })

  return {
    stats,
    statsFormat,
    sliderConfig,
    calculatedLevelSlider,
    currentLevelSliderValue,
  }
}
