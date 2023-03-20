import type { Character, TalentKey, TalentDetail } from '@/types'

import { labelCompiling } from '@/utils/calc'

interface ExtendedTalentDetail extends TalentDetail {
  table?: {
    header: string[]
    body: string[][]
  }
}

export function useTalents(character: Character) {
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

  return { currentTabKey, talentDetail }
}
