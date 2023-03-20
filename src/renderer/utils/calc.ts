import type { Character, Promotion } from '@/types'
import { useAppDataStore } from '@/store'

// 突破等级
type Ascension = number | '-' | '+'

/**
 * 返回角色在特定等级和突破阶段的属性表。
 * @param level: 整数
 * @param ascension: 突破阶段，可以为数字或'-'、'+'。默认为'-'。
 *                   只有在等级达到某些特定值时才会决定返回哪些统计数据
 */
function getPromotionBonus(
  promotions: Promotion[],
  level: number,
  ascension: Ascension = '-'
): [number, Promotion] {
  for (let index = promotions.length - 2; index >= 0; index--) {
    if (level > promotions[index].maxlevel) {
      return [index + 1, promotions[index + 1]]
    } else if (level === promotions[index].maxlevel) {
      const ascensionNumber =
        typeof ascension === 'number' ? ascension : ascension === '-' ? -Infinity : Infinity
      if (ascensionNumber > index || ascension === '+') {
        return [index + 1, promotions[index + 1]]
      } else {
        return [index, promotions[index]]
      }
    }
  }
  return [0, promotions[0]]
}

export function calcStatsCharacter(character: Character) {
  const appDataStore = useAppDataStore()
  const mystats = character.stats
  const mycurve = appDataStore.charactersCurve
  if (mystats === undefined || mycurve === undefined) return undefined
  /**
   * 计算角色在特定等级和突破阶段的属性值。
   * @param level: number - 等级。介于1-90之间的数字。如果不在范围内，返回undefined。
   * @param ascension: 突破阶段，可以为数字或'-'、'+'。默认为'-'。
   *                   只在等级边界(20, 40, 50, 60, 70, 80)决定返回哪些属性值。
   */
  return function (level: number, ascension: Ascension = '-') {
    level = parseInt(level.toString(), 10)
    if (isNaN(level)) return undefined
    if (level > 90 || level < 1) return undefined
    const [phase, promotion] = getPromotionBonus(mystats.promotion, level, ascension)
    const output = {
      level: level,
      ascension: phase,
      hp: mystats.base.hp * mycurve[level][mystats.curve.hp] + promotion.hp,
      attack: mystats.base.attack * mycurve[level][mystats.curve.attack] + promotion.attack,
      defense: mystats.base.defense * mycurve[level][mystats.curve.defense] + promotion.defense,
      specialized: promotion.specialized,
    }
    if (mystats.specialized === 'FIGHT_PROP_CRITICAL') output.specialized += mystats.base.critrate
    else if (mystats.specialized === 'FIGHT_PROP_CRITICAL_HURT')
      output.specialized += mystats.base.critdmg
    return output
  }
}

/**
 * 处理天赋标签，返回一个标签名和对应的值表
 */
export function labelCompiling(
  label: string,
  parameters: { [key: string]: number[] }
): { label: string; value: string[] } {
  const [labelName, valueTemplate] = label.split('|')

  const labelValue: string[] = []

  let isContinue: boolean = true
  while (labelValue.length < 15 && isContinue) {
    const matches = valueTemplate.matchAll(/{(.*?)}/g)
    let tempValue = valueTemplate

    for (const match of matches) {
      const grab = match[1] // example: param5:F1
      const [paramnum, format] = grab.split(':')
      const level = labelValue.length // 这里因为等级是从数组长度开始的所以是从0开始的

      let value = parameters[paramnum][level]?.toString()
      if (!value || value === 'undefined') {
        // 如果没有值，那么就退出循环
        isContinue = false
        break
      }

      if (format === 'I') {
        // 整数不参与其他处理
        label = label.replace(match[0], value)
      } else {
        if (format.includes('P')) {
          // 把小数转换为百分比
          value = (Number(value) * 100).toString()
        }
        if (format.includes('F')) {
          // 保留小数后，因为有百分比所以要在百分比处理之后
          const precision = 10 ** parseInt(format[1])
          if (!isNaN(precision)) {
            value = (Math.round(Number(value) * precision) / precision).toString()
          }
        }
        if (format.includes('P') && !format.includes('F')) {
          // 如果有P但是没有指定F，那么就默认只保留整数部分
          value = Math.round(Number(value)).toString()
        }
        if (format.includes('P')) {
          // 最后再加上百分比
          value = value + '%'
        }
      }
      tempValue = tempValue.replace(match[0], value)
    }
    console.log(isContinue)
    if (isContinue) labelValue.push(tempValue)
  }
  return { label: labelName, value: labelValue }
}
