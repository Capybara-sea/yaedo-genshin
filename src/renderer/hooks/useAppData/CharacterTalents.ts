import type { Character } from '@/types'

export function useTalents(character: Character) {
  return character.talents
}
