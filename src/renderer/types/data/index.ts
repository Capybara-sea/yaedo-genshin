import { Character } from './characters'
import { CharactersCurve } from './charactersCurve'

export type AppDataType = keyof AppData
export interface AppData {
  characters: Character[]
  charactersCurve: CharactersCurve
}

export interface Items {
  name: string
  count: number
}

export * from './characters'
export * from './charactersCurve'
export * from './constellations'
export * from './talents'
