import type { Character, Items } from '@/types'

import { zipWith } from 'lodash-es'
import { calcStatsCharacter } from '@/utils/calc'
import { Attributes, AttributesName } from '@/types/data/characters'

export function useCharacterStats(character: Character) {
  /** 突破等级 */
  const ascensionList = [20, 40, 50, 60, 70, 80]

  /** 突破等级标签 */
  const marks: Record<number, string> = {}
  ascensionList.forEach((ascension, i) => {
    marks[ascension + i + 1] = `${ascension}+`
  })

  /** 拖动条配置 */
  const sliderConfig = {
    min: 1,
    max: 96,
    marks,
  }

  /** 角色属性计算器 */
  const statsCalculator = computed(() => {
    if (!character) return undefined
    return calcStatsCharacter(character)
  })

  /** 拖动条数据 */
  const currentLevelSliderValue = ref<number>(sliderConfig.max)
  const currentLevelSliderThrottled = refThrottled(currentLevelSliderValue, 300)

  /** 计算后的拖动条数据 */
  const calculatedLevelSlider = computed<{ level: number; ascension: '+' | '-'; str: string }>(
    () => {
      let tempLevel = currentLevelSliderThrottled.value
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

  /** 角色属性 */
  const stats = computed(() => {
    if (!statsCalculator.value) return undefined
    const { level, ascension } = calculatedLevelSlider.value
    return statsCalculator.value(level, ascension)
  })

  /** 角色属性格式化 */
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
      specialized:
        specializedCode === Attributes.FIGHT_PROP_ELEMENT_MASTERY
          ? '' + Math.round(specialized || 0)
          : '' + Math.round((specialized || 0) * 1000) / 10 + '%',
      specializedName: (AttributesName as any)[specializedCode] || '未知',
    }
  })

  /** 找到键名中的数字部分 */
  const findDigital = (str: string): number => Number(str.match(/\d+/)?.[0])

  /** 单阶段花费 */
  const costs = computed(() => {
    if (!character) return undefined
    // 找到键名中的数字部分
    const key = Object.keys(character.costs).filter(
      (ascend) => findDigital(ascend) == stats.value?.ascension
    )?.[0] as keyof typeof character.costs
    // 返回对应的花费
    return key ? character.costs[key] : character.costs.ascend1
  })

  /** 所有阶段花费 */
  const allCosts = computed(() => {
    if (!character) return undefined
    // 找到截止到目前阶段的花费 返回一个二维数组
    // [[ascend1], [ascend2], ...] 直到当前阶段
    const allAscendCosts = Object.keys(character.costs).map((ascend) => {
      // 如果当前阶段小于等于角色当前阶段，则返回该阶段的花费
      return findDigital(ascend) <= (stats.value?.ascension || 0) + 1
        ? character.costs[ascend as keyof typeof character.costs]
        : []
    })
    // 按顺序合并数组（目的是让同类型材料能并拢）
    const mergedAscendCosts = zipWith(...allAscendCosts, (...args) => args)
      // 扁平化 把每个阶段的数组对象合并成一个数组对象
      .flat()
      .reduce<Items[]>((prev, curr) => {
        if (!curr) return prev
        // 找到相同的name，count累加
        const index = prev.findIndex((item) => item.name == curr?.name)
        if (index != -1) prev[index].count += curr.count
        else prev.push({ ...curr }) // 需要解构，否则会引用同一个对象
        return prev
      }, [])
    return mergedAscendCosts
  })

  return {
    /** 单阶段花费 */
    costs,
    /** 所有阶段花费 */
    allCosts,
    /** 角色属性 */
    stats,
    /** 角色属性格式化 */
    statsFormat,
    /** 拖动条配置 */
    sliderConfig,
    /** 计算后的拖动条数据 */
    calculatedLevelSlider,
    /** 拖动条数据 */
    currentLevelSliderValue,
  }
}
