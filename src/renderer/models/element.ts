export interface ElementType {
  id: string
  name: string
  icon: {
    s: string
    l: string
  }
  color: string
}

export class Element {
  public static get(str: string) {
    // 根据输入的str, 查找elementTypes中的元素, 只要id和name相同就返回
    str = str.toLocaleLowerCase()
    return Element.data.find((item) => item.id === str || item.name === str)
  }

  public static data: ElementType[] = [
    {
      id: 'pyro',
      name: '火',
      icon: {
        s: 'yaedo://images/ui_element_pyro_small.webp',
        l: 'yaedo://images/ui_element_pyro_large.webp',
      },
      color: '#ef7a35',
    },
    {
      id: 'hydro',
      name: '水',
      icon: {
        s: 'yaedo://images/ui_element_hydro_small.webp',
        l: 'yaedo://images/ui_element_hydro_large.webp',
      },
      color: '#4bc3f1',
    },
    {
      id: 'anemo',
      name: '风',
      icon: {
        s: 'yaedo://images/ui_element_anemo_small.webp',
        l: 'yaedo://images/ui_element_anemo_large.webp',
      },
      color: '#75c3a9',
    },
    {
      id: 'electro',
      name: '雷',
      icon: {
        s: 'yaedo://images/ui_element_electro_small.webp',
        l: 'yaedo://images/ui_element_electro_large.webp',
      },
      color: '#b08fc2',
    },
    {
      id: 'dendro',
      name: '草',
      icon: {
        s: 'yaedo://images/ui_element_dendro_small.webp',
        l: 'yaedo://images/ui_element_dendro_large.webp',
      },
      color: '#a6c938',
    },
    {
      id: 'cryo',
      name: '冰',
      icon: {
        s: 'yaedo://images/ui_element_cryo_small.webp',
        l: 'yaedo://images/ui_element_cryo_large.webp',
      },
      color: '#a0d7e4',
    },
    {
      id: 'geo',
      name: '岩',
      icon: {
        s: 'yaedo://images/ui_element_geo_small.webp',
        l: 'yaedo://images/ui_element_geo_large.webp',
      },
      color: '#fab72e',
    },
  ]
}
