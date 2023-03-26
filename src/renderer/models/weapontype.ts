export interface WeapontypeList {
  id: string
  name: string
  icon: string
}

export class Weapontype {
  public static get(str: string) {
    // 根据输入的str, 查找rarityList中的元素, 只要id和name相同就返回
    str = str.toLocaleLowerCase()
    return Weapontype.data.find((item) => item.id === str || item.name === str)
  }

  public static data: WeapontypeList[] = [
    {
      id: 'bow',
      name: '弓',
      icon: 'yaedo://images/ui_weapon_type_bow.webp',
    },
    {
      id: 'catalyst',
      name: '法器',
      icon: 'yaedo://images/ui_weapon_type_catalyst.webp',
    },
    {
      id: 'claymore',
      name: '双手剑',
      icon: 'yaedo://images/ui_weapon_type_claymore.webp',
    },
    {
      id: 'pole',
      name: '长柄武器',
      icon: 'yaedo://images/ui_weapon_type_pole.webp',
    },
    {
      id: 'sword',
      name: '单手剑',
      icon: 'yaedo://images/ui_weapon_type_sword.webp',
    },
  ]
}
