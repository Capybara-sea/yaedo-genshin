export type Constellations = {
  name: string
  images: ConstellationImages
  version: string
} & {
  [key in ConstellationKey]: ConstellationDetail
}

export interface ConstellationDetail {
  name: string
  effect: string
}

export type ConstellationImages = {
  constellation: string
  // only for player characters. shows girl constellation image
  constellation2?: string
} & {
  [key in ConstellationKey]: string
}

export type ConstellationKey = 'c1' | 'c2' | 'c3' | 'c4' | 'c5' | 'c6'
