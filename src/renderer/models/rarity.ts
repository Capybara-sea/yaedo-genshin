export interface RarityType {
  id: string
  name: string
  icon: string
  color: string
}

export class Rarity {
  public static get(str: string) {
    // 根据输入的str, 查找rarityList中的元素, 只要id和name相同就返回
    str = str.toLocaleLowerCase()
    return Rarity.data.find((item) => item.id === str || item.name === str)
  }

  public static data: RarityType[] = [
    {
      id: '1',
      name: 'rarity1',
      icon: 'yaedo://images/ui_rarity_1.webp',
      color: '#818486',
    },
    {
      id: '2',
      name: 'rarity1',
      icon: 'yaedo://images/ui_rarity_2.webp',
      color: '#5a977a',
    },
    {
      id: '3',
      name: 'rarity1',
      icon: 'yaedo://images/ui_rarity_3.webp',
      color: '#5987ad',
    },
    {
      id: '4',
      name: 'rarity1',
      icon: 'yaedo://images/ui_rarity_4.webp',
      color: '#9470bb',
    },
    {
      id: '5',
      name: 'rarity1',
      icon: 'yaedo://images/ui_rarity_5.webp',
      color: '#c87c24',
    },
  ]
}
