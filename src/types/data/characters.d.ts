export interface Character {
  /** id */
  id: string
  /** 角色名 */
  name: string
  /** 角色名（英文） */
  enName: string
  /** 称号 */
  title: string
  /** 描述 */
  description: string
  /** 稀有度 */
  rarity: Rarity
  /** 元素属性 */
  element: Element
  /** 武器类型 */
  weapontype: string
  /** 副词条 */
  substat: string
  /** 性别 */
  gender: string
  /** 体型 */
  body: string
  /** 关联 */
  association: string
  /** 地区 */
  region: string
  /** 国家 */
  affiliation: string
  /** 生日 */
  birthdaymmdd: string
  /** 生日 */
  birthday: string
  /** 命星 */
  constellation: string
  /** 声优 */
  cv: Cv
  /** 花费 */
  costs: Costs
  /** 图片 */
  images: Images
  /** 版本 */
  version: string
  /** 技能 */
  talents: Talents
  /** 命座 */
  constellations: Constellations
}

export type Rarity = '1' | '2' | '3' | '4' | '5'

// 元素属性
export type Element = '火' | '水' | '风' | '雷' | '草' | '冰' | '岩'

// 声优
interface Cv {
  english: string
  chinese: string
  japanese: string
  korean: string
}

/** 突破费用 */
interface Costs {
  ascend1: Ascend[]
  ascend2: Ascend[]
  ascend3: Ascend[]
  ascend4: Ascend[]
  ascend5: Ascend[]
  ascend6: Ascend[]
}

/** 角色图片 */
export interface Images {
  splash: string
  card: string
  icon: string
  sideIcon: string
}

/** 命座 */
export interface Constellations {
  name: string
  c1: Constellation
  c2: Constellation
  c3: Constellation
  c4: Constellation
  c5: Constellation
  c6: Constellation
  images: ConstellationsImages
  version: string
}

/** 命座图片 */
export interface ConstellationsImages {
  c1: string
  c2: string
  c3: string
  c4: string
  c5: string
  c6: string
  constellation: string
}

/** 命座详情 */
export interface Constellation {
  name: string
  effect: string
}

/** 天赋 */
export interface Talents {
  name: string
  combat1: Combat1
  combat2: Combat2
  combatsp?: Combatsp
  combat3: Combat3
  passive1: Passive
  passive2: Passive
  passive3: Passive
  passive4?: Passive
  costs: TalentCosts
  images: TalentsImages
  version: string
}

/** 普通攻击 */
export interface Combat1 {
  name: string
  info: string
  attributes: Attributes
}
export interface Attributes {
  labels: string[]
  parameters: Parameters
}
export interface Parameters {
  param1: number[]
  param2: number[]
  param3: number[]
  param4: number[]
  param5?: number[]
  param6?: number[]
  param7: number[]
  param8?: number[]
  param9?: number[]
  param10?: number[]
  param11?: number[]
  param12?: number[]
  param13?: number[]
  param14?: number[]
  param15?: number[]
  param16?: number[]
  param17?: number[]
  param18?: number[]
  param19?: number[]
  param20?: number[]
}

/** 元素战技 */
export interface Combat2 {
  name: string
  info: string
  description: string
  attributes: Attributes2
}
export interface Attributes2 {
  labels: string[]
  parameters: Parameters2
}
export interface Parameters2 {
  param1: number[]
  param2: number[]
  param3?: number[]
  param4?: number[]
  param5?: number[]
  param6?: number[]
  param7?: number[]
  param8?: number[]
  param9?: number[]
  param10?: number[]
  param11?: number[]
  param12?: number[]
  param13?: number[]
  param14?: number[]
  param15?: number[]
  param16?: number[]
}

/** 战斗天赋 */
export interface Combatsp {
  name: string
  info: string
  description: string
  attributes: Attributes3
}
export interface Attributes3 {
  labels: string[]
  parameters: Parameters3
}
export interface Parameters3 {
  param1: number[]
  param2: number[]
  param3?: number[]
}

/** 元素爆发 */
export interface Combat3 {
  name: string
  info: string
  description: string
  attributes: Attributes4
}
export interface Attributes4 {
  labels: string[]
  parameters: Parameters4
}
export interface Parameters4 {
  param1: number[]
  param2?: number[]
  param3?: number[]
  param4?: number[]
  param5?: number[]
  param6?: number[]
  param7?: number[]
  param8?: number[]
  param9?: number[]
  param10?: number[]
  param11?: number[]
  param12?: number[]
  param13?: number[]
  param14?: number[]
  param15?: number[]
  param16?: number[]
  param17?: number[]
  param18?: number[]
  param19?: number[]
  param20?: number[]
}

/** 固有天赋 */
export interface Passive {
  name: string
  info: string
}

/** 天赋升级花费 */
export interface TalentCosts {
  lvl2: Ascend[]
  lvl3: Ascend[]
  lvl4: Ascend[]
  lvl5: Ascend[]
  lvl6: Ascend[]
  lvl7: Ascend[]
  lvl8: Ascend[]
  lvl9: Ascend[]
  lvl10: Ascend[]
}

/** 天赋图片 */
export interface TalentsImages {
  combat1: string
  combat2: string
  combatsp?: string
  combat3: string
  passive1: string
  passive2: string
  passive3: string
  passive4?: string
}

/** 花费 */
export interface Ascend {
  name: string
  count: number
}
