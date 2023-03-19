import { Items } from '.'

export type Talents = {
  name: string
  version: string
  costs: {
    lvl2: Items[]
    lvl3: Items[]
    lvl4: Items[]
    lvl5: Items[]
    lvl6: Items[]
    lvl7: Items[]
    lvl8: Items[]
    lvl9: Items[]
    lvl10: Items[]
  }
  images?: {
    [key in TalentKey]: string
  }
} & {
  [key in TalentKey]: TalentDetail
}

export interface TalentDetail {
  name: string
  info: string
  // no description for combat1 and passive
  description?: string
  // no attributes for passive
  attributes?: {
    labels: string[]
    parameters: {
      [key: string]: number[]
    }
  }
}

export type TalentKey =
  | 'combat1'
  | 'combat2'
  | 'combatsp' // for mona/ayaka
  | 'combat3'
  | 'passive1'
  | 'passive2'
  | 'passive3' // player character doesn't have a third talent
  | 'passive4' // for kokomi
