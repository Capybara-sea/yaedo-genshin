export * from './characters'
export * from './charactersCurve'

import { Character } from './characters'
import { CharactersCurve } from './charactersCurve'
export type AppDataType = 'characters' | 'charactersCurve'
export interface AppData {
  characters: Character[]
  charactersCurve: CharactersCurve
}
