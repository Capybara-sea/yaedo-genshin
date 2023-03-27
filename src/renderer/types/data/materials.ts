export interface Material {
  id: string
  name: string
  description: string
  rarity?: string
  source: string[]
  version: string
  category: string
  sortorder: number
  materialtype: string
  images: {
    icon: string
  }
  dropdomain?: string
  daysofweek?: string[]
  dupealias?: string
}
