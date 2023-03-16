export * from './characters'

import { Character } from './characters'
export type AppDataType = 'characters' | 'weapons'
export interface AppData {
  characters: Character[]
  weapons: any[]  // TODO
}
