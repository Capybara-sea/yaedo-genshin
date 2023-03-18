import { useAppDataStore } from '@/store'
import type { Character, Promotion } from '@/types'

// 突破等级
type Ascension = number | '-' | '+'

/**
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
    console.log(promotion.specialized)
    if (mystats.specialized === 'FIGHT_PROP_CRITICAL') output.specialized += mystats.base.critrate
    else if (mystats.specialized === 'FIGHT_PROP_CRITICAL_HURT')
      output.specialized += mystats.base.critdmg
    return output
  }
}
