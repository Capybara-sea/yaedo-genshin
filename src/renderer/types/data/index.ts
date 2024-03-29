import { Character } from './characters'
import { CharactersCurve } from './charactersCurve'
import { Weapon } from './weapons'
import { Material } from './materials'

export type AppDataType = keyof AppData
export interface AppData {
  characters: Character[]
  charactersCurve: CharactersCurve
  materials: Material[]
  weapons: Weapon[]
}

export * from './base'
export * from './characters'
export * from './charactersCurve'
export * from './constellations'
export * from './materials'
export * from './talents'
export * from './weapons'
