import type { MenuOption } from 'naive-ui'
import { h, ref, computed, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { menu_home, menu_setting, menu_characters } from '@/assets/icons'

export interface RenderMenuOption {
  el: any
  to: string
  label: string
  key: string
  icon: string
}

export const renderMenuOption = (option: RenderMenuOption): MenuOption => {
  return {
    key: option.key,
    label: () => h(option.el, { to: { name: option.to } }, { default: () => option.label }),
    icon: () => h('img', { src: option.icon, alt: 'icon', style: 'width: 1em; height: 1em' }),
  }
}

export function useSideMenu() {
  // TODO : 和主进程通信，获取侧边栏状态，以及侧边栏自定义菜单内容
  // const appStore = useAppStore()
  // const isSideMenuOpen = computed(() => appStore.isSideMenuOpen)

  const customMenuOptions = ref<MenuOption[]>([])

  const defaultMenuOptions: MenuOption[] = [
    renderMenuOption({
      el: RouterLink,
      to: 'Home',
      label: '首页',
      key: 'Home',
      icon: menu_home,
    }),
    renderMenuOption({
      el: RouterLink,
      to: 'Characters',
      label: '角色',
      key: 'Characters',
      icon: menu_characters,
    }),
    renderMenuOption({
      el: RouterLink,
      to: 'Setting',
      label: '设置',
      key: 'Setting',
      icon: menu_setting,
    }),
  ]

  const menuOptions = computed<MenuOption[]>(() => {
    return [...defaultMenuOptions, ...(customMenuOptions.value as MenuOption[])]
  })

  const router = useRouter()
  const currentRoute = computed<string>(() => {
    const name = router.currentRoute.value.name
    if (name === undefined || name === null) return 'Home'
    return name as string
  })

  return { menuOptions, currentRoute }
}
