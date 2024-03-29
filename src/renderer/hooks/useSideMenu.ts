import type { MenuOption } from 'naive-ui'
import type { RouteRecordName } from 'vue-router'
import { getRouteFirstName } from '@/utils/router'
import { RouterLink } from 'vue-router'
import * as icons from '@/assets/icons'
import { useTheme } from '@/hooks'

export interface RenderMenuOption {
  el: any
  to: string
  label: string
  key: string
  icon: string
}

const renderMenuOptions: RenderMenuOption[] = [
  {
    el: RouterLink,
    to: 'Home',
    label: '首页',
    key: 'Home',
    icon: icons.menu_home,
  },
  {
    el: RouterLink,
    to: 'Characters',
    label: '角色',
    key: 'Characters',
    icon: icons.menu_characters,
  },
  {
    el: RouterLink,
    to: 'Weapons',
    label: '武器',
    key: 'Weapons',
    icon: icons.menu_weapons,
  },
  {
    el: RouterLink,
    to: 'Settings',
    label: '设置',
    key: 'Settings',
    icon: icons.menu_settings,
  },
]

export function useSideMenu() {
  // TODO : 和主进程通信，获取侧边栏状态，以及侧边栏自定义菜单内容
  // const appStore = useAppStore()
  // const isSideMenuOpen = computed(() => appStore.isSideMenuOpen)

  const { isDark } = useTheme()

  const customMenuOptions = ref<MenuOption[]>([])

  const renderMenuOption = (option: RenderMenuOption): MenuOption => {
    return {
      key: option.key,
      label: () => h(option.el, { to: { name: option.to } }, { default: () => option.label }),
      icon: () =>
        h('img', {
          src: option.icon,
          alt: 'icon',
          style: `width: 1em; height: 1em; ${isDark.value ? '' : 'filter: invert(40%)'}`,
        }),
    }
  }

  const defaultMenuOptions: MenuOption[] = renderMenuOptions.map(renderMenuOption)

  const menuOptions = computed<MenuOption[]>(() => {
    return [...defaultMenuOptions, ...(customMenuOptions.value as MenuOption[])]
  })

  const route = useRoute()
  const currentRoute = computed<RouteRecordName>(() => {
    return getRouteFirstName(route)
  })

  return { menuOptions, currentRoute }
}
