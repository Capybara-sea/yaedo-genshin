import { Items } from '.'

export interface Weapon {
  /** 武器id */
  id: string
  /** 武器名 */
  name: string
  /** 武器描述 */
  description: string
  /** 武器类型 */
  weapontype: string
  /** 武器稀有度 */
  rarity: string
  /** 武器故事 */
  story: string
  /** 基础攻击力 */
  baseatk: number
  /** 武器副词条 */
  substat: string
  /** 武器副词条值 */
  subvalue: string
  /** 武器特效名 */
  effectname: string
  /** 武器特效描述 */
  effect: string
  /** 精炼数值等级 */
  refine: [string[], string[], string[], string[], string[]]
  /** 突破花费 */
  costs: {
    ascend1: Items[]
    ascend2: Items[]
    ascend3: Items[]
    ascend4: Items[]
    ascend5?: Items[]
    ascend6?: Items[]
  }
  /** 版本 */
  version: string
  /** 图片 */
  images: {
    icon: string
    gacha: string
    awaken: string
  }
}
