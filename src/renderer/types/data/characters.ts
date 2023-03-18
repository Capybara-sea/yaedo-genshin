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
  weapontype: Weapontype
  /** 副词条 */
  substat: string
  /** 性别 */
  gender: string
  /** 体型 */
  body: string
  /** 关联 */
  association: string
  /** 国家 */
  region: string
  /** 所属 */
  affiliation: string
  /** 生日 */
  birthdaymmdd: string
  /** 生日 */
  birthday: string
  /** 命星 */
  constellation: string
  /** 基础数据 */
  stats: Stats
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

// 稀有度
type Rarity = '1' | '2' | '3' | '4' | '5'

// 元素属性
type Element = '火' | '水' | '风' | '雷' | '草' | '冰' | '岩'

// 武器类型
type Weapontype = '单手剑' | '双手剑' | '长柄武器' | '法器' | '弓'

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
interface Images {
  splash: string
  card: string
  icon: string
  sideIcon: string
}

/** 命座 */
interface Constellations {
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
interface ConstellationsImages {
  c1: string
  c2: string
  c3: string
  c4: string
  c5: string
  c6: string
  constellation: string
  constellation2?: string
}

/** 命座详情 */
interface Constellation {
  name: string
  effect: string
}

/** 天赋 */
interface Talents {
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
interface Combat1 {
  name: string
  info: string
  attributes: Attributes
}
interface Attributes {
  labels: string[]
  parameters: Parameters
}
interface Parameters {
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
interface Combat2 {
  name: string
  info: string
  description: string
  attributes: Attributes2
}
interface Attributes2 {
  labels: string[]
  parameters: Parameters2
}
interface Parameters2 {
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
interface Combatsp {
  name: string
  info: string
  description: string
  attributes: Attributes3
}
interface Attributes3 {
  labels: string[]
  parameters: Parameters3
}
interface Parameters3 {
  param1: number[]
  param2: number[]
  param3?: number[]
}

/** 元素爆发 */
interface Combat3 {
  name: string
  info: string
  description: string
  attributes: Attributes4
}
interface Attributes4 {
  labels: string[]
  parameters: Parameters4
}
interface Parameters4 {
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
interface Passive {
  name: string
  info: string
}

/** 天赋升级花费 */
interface TalentCosts {
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
interface TalentsImages {
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
interface Ascend {
  name: string
  count: number
}

/** 基础数据 */
interface Stats {
  base: Base
  curve: Curve
  specialized: SpecializedProperty
  promotion: Promotion[]
}

/** 等级突破 */
interface Promotion {
  maxlevel: number
  hp: number
  attack: number
  defense: number
  specialized: number
}

/** 曲线 */
interface Curve {
  hp: string
  attack: string
  defense: string
}

/** 基础数据 */
interface Base {
  hp: number
  attack: number
  defense: number
  critrate: number
  critdmg: number
}

export enum SpecializedProperty {
  FIGHT_PROP_HP_PERCENT = '生命值加成',
  FIGHT_PROP_DEFENSE_PERCENT = '防御力加成',
  FIGHT_PROP_ATTACK_PERCENT = '攻击力加成',
  FIGHT_PROP_CHARGE_EFFICIENCY = '元素充能效率',
  FIGHT_PROP_HEAL_ADD = '治疗加成',
  FIGHT_PROP_CRITICAL = '暴击率',
  FIGHT_PROP_CRITICAL_HURT = '暴击伤害',
  FIGHT_PROP_ELEMENT_MASTERY = '元素精通',
  FIGHT_PROP_ROCK_ADD_HURT = '岩伤加成',
  FIGHT_PROP_WIND_ADD_HURT = '风伤加成',
  FIGHT_PROP_WATER_ADD_HURT = '水伤加成',
  FIGHT_PROP_FIRE_ADD_HURT = '火伤加成',
  FIGHT_PROP_ELEC_ADD_HURT = '雷伤加成',
  FIGHT_PROP_ICE_ADD_HURT = '冰伤加成',
  FIGHT_PROP_GRASS_ADD_HURT = '草伤加成',
  FIGHT_PROP_PHYSICAL_ADD_HURT = '物伤加成',
}
