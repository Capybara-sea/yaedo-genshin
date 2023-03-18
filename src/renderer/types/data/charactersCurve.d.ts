export interface CharactersCurve {
  [key: string]: CharactersCurveItem
}

type CharactersCurveItem = {
  GROW_CURVE_HP_S4: number
  GROW_CURVE_ATTACK_S4: number
  GROW_CURVE_HP_S5: number
  GROW_CURVE_ATTACK_S5: number
  [key: string]: number
}
