import type { Character, TalentKey, TalentDetail, Items } from '@/types'

import { zipWith } from 'lodash-es'
import { labelCompiling } from '../utils'

export interface ExtendedTalentDetail extends TalentDetail {
  table?: {
    header: string[]
    body: string[][]
  }
}

export function useTalents(character: Character) {
  const sliderConfig = {
    min: 1,
    max: 15,
    marks: { 1: '1', 6: '6', 10: '10', 13: '13', 15: '15' },
  }

  // 当前已选择天赋
  const currentTabKey = ref<TalentKey>('combat1')

  // 当前天赋的详情
  const talentDetail = computed<ExtendedTalentDetail>(() => {
    // 获取当前天赋
    const talentDetail = character.talents[currentTabKey.value]
    if (!talentDetail) return talentDetail
    // 处理天赋表格
    const { attributes } = talentDetail
    if (!attributes) return talentDetail

    // 最大等级
    const maxLevel = Math.max(...Object.values(attributes.parameters).map((attr) => attr.length))
    // 表头
    const header = Array.from(Array(maxLevel + 1)).map((_, i) => (i === 0 ? '等级' : `Lv.${i}`))
    // 表身
    const body = attributes.labels.map((label) => {
      const attr = labelCompiling(label, attributes.parameters)
      return [attr.label, ...attr.value]
    })
    return { ...talentDetail, table: { header, body } }
  })

  const talentLevel = ref<number>(1)

  const talentCalc = computed(() => {
    const level = talentLevel.value
    const data = talentDetail.value.table?.body
    return data?.map((row) => ({
      label: row[0],
      value: row[level],
    }))
  })

  function talentCostCalc(level: number): Items[] {
    const cost = (character.talents.costs as any)[`lvl${level + 1}`]
    return cost
  }

  const talentCost = computed(() => {
    return talentCostCalc(talentLevel.value)
  })

  const talentCostAll = computed(() => {
    const talentCosts = Array.from(Array(talentLevel.value)).map((_, i) => talentCostCalc(i + 1))
    const mergedTalentCosts = zipWith(...talentCosts, (...args) => args)
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
    return mergedTalentCosts
  })

  return {
    sliderConfig,
    currentTabKey,
    talentDetail,
    talentLevel,
    talentCalc,
    talentCost,
    talentCostAll,
  }
}
