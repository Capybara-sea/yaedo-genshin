import type { Talents } from './talents'
import type { Constellations } from './constellations'
import { Items, Element, Rarity, Weapontype } from '.'

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
  cv: {
    english: string
    chinese: string
    japanese: string
    korean: string
  }
  /** 花费 */
  costs: {
    ascend1: Items[]
    ascend2: Items[]
    ascend3: Items[]
    ascend4: Items[]
    ascend5: Items[]
    ascend6: Items[]
  }
  /** 图片 */
  images: Images
  /** 版本 */
  version: string
  /** 技能 */
  talents: Talents
  /** 命座 */
  constellations: Constellations
}

/** 角色图片 */
export interface Images {
  splash: string
  card: string
  icon: string
  sideIcon: string
}

/** 基础数据 */
export interface Stats {
  base: Base
  curve: Curve
  specialized: Attributes
  promotion: Promotion[]
}

/** 等级突破 */
export interface Promotion {
  maxlevel: number
  hp: number
  attack: number
  defense: number
  specialized: number
}

/** 曲线 */
export interface Curve {
  hp: string
  attack: string
  defense: string
}

/** 基础数据 */
export interface Base {
  hp: number
  attack: number
  defense: number
  critrate: number
  critdmg: number
}

export enum Attributes {
  /** 生命值加成 */
  FIGHT_PROP_HP_PERCENT = 'FIGHT_PROP_HP_PERCENT',
  /** 防御力加成 */
  FIGHT_PROP_DEFENSE_PERCENT = 'FIGHT_PROP_DEFENSE_PERCENT',
  /** 攻击力加成 */
  FIGHT_PROP_ATTACK_PERCENT = 'FIGHT_PROP_ATTACK_PERCENT',
  /** 元素充能效率 */
  FIGHT_PROP_CHARGE_EFFICIENCY = 'FIGHT_PROP_CHARGE_EFFICIENCY',
  /** 治疗加成 */
  FIGHT_PROP_HEAL_ADD = 'FIGHT_PROP_HEAL_ADD',
  /** 暴击率 */
  FIGHT_PROP_CRITICAL = 'FIGHT_PROP_CRITICAL',
  /** 暴击伤害 */
  FIGHT_PROP_CRITICAL_HURT = 'FIGHT_PROP_CRITICAL_HURT',
  /** 元素精通 */
  FIGHT_PROP_ELEMENT_MASTERY = 'FIGHT_PROP_ELEMENT_MASTERY',
  /** 岩伤加成 */
  FIGHT_PROP_ROCK_ADD_HURT = 'FIGHT_PROP_ROCK_ADD_HURT',
  /** 风伤加成 */
  FIGHT_PROP_WIND_ADD_HURT = 'FIGHT_PROP_WIND_ADD_HURT',
  /** 水伤加成 */
  FIGHT_PROP_WATER_ADD_HURT = 'FIGHT_PROP_WATER_ADD_HURT',
  /** 火伤加成 */
  FIGHT_PROP_FIRE_ADD_HURT = 'FIGHT_PROP_FIRE_ADD_HURT',
  /** 雷伤加成 */
  FIGHT_PROP_ELEC_ADD_HURT = 'FIGHT_PROP_ELEC_ADD_HURT',
  /** 冰伤加成 */
  FIGHT_PROP_ICE_ADD_HURT = 'FIGHT_PROP_ICE_ADD_HURT',
  /** 草伤加成 */
  FIGHT_PROP_GRASS_ADD_HURT = 'FIGHT_PROP_GRASS_ADD_HURT',
  /** 物伤加成 */
  FIGHT_PROP_PHYSICAL_ADD_HURT = 'FIGHT_PROP_PHYSICAL_ADD_HURT',
}

export enum AttributesName {
  /** 生命值加成 */
  FIGHT_PROP_HP_PERCENT = '生命值加成',
  /** 防御力加成 */
  FIGHT_PROP_DEFENSE_PERCENT = '防御力加成',
  /** 攻击力加成 */
  FIGHT_PROP_ATTACK_PERCENT = '攻击力加成',
  /** 元素充能效率 */
  FIGHT_PROP_CHARGE_EFFICIENCY = '元素充能效率',
  /** 治疗加成 */
  FIGHT_PROP_HEAL_ADD = '治疗加成',
  /** 暴击率 */
  FIGHT_PROP_CRITICAL = '暴击率',
  /** 暴击伤害 */
  FIGHT_PROP_CRITICAL_HURT = '暴击伤害',
  /** 元素精通 */
  FIGHT_PROP_ELEMENT_MASTERY = '元素精通',
  /** 岩伤加成 */
  FIGHT_PROP_ROCK_ADD_HURT = '岩伤加成',
  /** 风伤加成 */
  FIGHT_PROP_WIND_ADD_HURT = '风伤加成',
  /** 水伤加成 */
  FIGHT_PROP_WATER_ADD_HURT = '水伤加成',
  /** 火伤加成 */
  FIGHT_PROP_FIRE_ADD_HURT = '火伤加成',
  /** 雷伤加成 */
  FIGHT_PROP_ELEC_ADD_HURT = '雷伤加成',
  /** 冰伤加成 */
  FIGHT_PROP_ICE_ADD_HURT = '冰伤加成',
  /** 草伤加成 */
  FIGHT_PROP_GRASS_ADD_HURT = '草伤加成',
  /** 物伤加成 */
  FIGHT_PROP_PHYSICAL_ADD_HURT = '物伤加成',
}
