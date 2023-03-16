export function uiMapping(key?: string) {
  let result = ''
  switch (key) {
    case '火':
    case 'pyro':
    case 'Pyro':
      result = 'element_pyro_small'
      break

    case '水':
    case 'hydro':
    case 'Hydro':
      result = 'element_hydro_small'
      break

    case '风':
    case 'anemo':
    case 'Anemo':
      result = 'element_anemo_small'
      break

    case '雷':
    case 'electro':
    case 'Electro':
      result = 'element_electro_small'
      break

    case '草':
    case 'dendro':
    case 'Dendro':
      result = 'element_dendro_small'
      break

    case '冰':
    case 'cryo':
    case 'Cryo':
      result = 'element_cryo_small'
      break

    case '岩':
    case 'geo':
    case 'Geo':
      result = 'element_geo_small'
      break

    case 'rarity1':
    case 'rarity_1':
      result = 'rarity_1'
      break

    case 'rarity2':
    case 'rarity_2':
      result = 'rarity_2'
      break

    case 'rarity3':
    case 'rarity_3':
      result = 'rarity_3'
      break

    case 'rarity4':
    case 'rarity_4':
      result = 'rarity_4'
      break

    case 'rarity5':
    case 'rarity_5':
      result = 'rarity_5'
      break
  }
  return `yaedo://images/ui_${result}.webp`
}

export function colorMapping(key?: string) {
  let result = ''
  switch (key) {
    case '火':
    case 'pyro':
    case 'Pyro':
      result = '#ec7c34'
      break

    case '水':
    case 'hydro':
    case 'Hydro':
      result = '#4cc4f4'
      break

    case '风':
    case 'anemo':
    case 'Anemo':
      result = '#74c4ac'
      break

    case '雷':
    case 'electro':
    case 'Electro':
      result = '#b48cc4'
      break

    case '草':
    case 'dendro':
    case 'Dendro':
      result = '#a4cc3c'
      break

    case '冰':
    case 'cryo':
    case 'Cryo':
      result = '#a4d4e4'
      break

    case '岩':
    case 'geo':
    case 'Geo':
      result = '#fcb42c'
      break

    case 'rarity1':
    case 'rarity_1':
      result = '#818486'
      break

    case 'rarity2':
    case 'rarity_2':
      result = '#5a977a'
      break

    case 'rarity3':
    case 'rarity_3':
      result = '#5987ad'
      break

    case 'rarity4':
    case 'rarity_4':
      result = '#9470bb'
      break

    case 'rarity5':
    case 'rarity_5':
      result = '#c87c24'
      break
  }
  return result
}