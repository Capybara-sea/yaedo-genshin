import type { MenuOption } from 'naive-ui'
import { h, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'

export interface RenderMenuOption {
  el: any
  to: string
  label: string
  key: string
}

export const renderMenuOption = (option: RenderMenuOption): MenuOption => {
  return {
    label: () => h(option.el, { to: { name: option.to } }, { default: () => option.label }),
    key: option.key,
  }
}

export function useSideMenu() {
  // TODO 和主进程通信，获取侧边栏状态，以及侧边栏自定义菜单内容
  // const appStore = useAppStore()
  // const isSideMenuOpen = computed(() => appStore.isSideMenuOpen)

  const customMenuOptions = ref<MenuOption[]>([])

  const defaultMenuOptions: MenuOption[] = [
    renderMenuOption({ el: RouterLink, to: 'Home', label: '首页', key: 'Home' }),
    renderMenuOption({ el: RouterLink, to: 'Characters', label: '角色', key: 'Characters' }),
  ]

  const menuOptions = computed<MenuOption[]>(() => {
    return [...defaultMenuOptions, ...(customMenuOptions.value as MenuOption[])]
  })

  return { menuOptions }
}
