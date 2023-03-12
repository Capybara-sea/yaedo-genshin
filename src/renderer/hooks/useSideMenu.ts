import type { MenuOption } from 'naive-ui'
import { h, ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import icon_home from '@/assets/icons/home.png'
import icon_setting from '@/assets/icons/settings.png'
import icon_characters from '@/assets/icons/characters.png'

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
      icon: icon_home,
    }),
    renderMenuOption({
      el: RouterLink,
      to: 'Characters',
      label: '角色',
      key: 'Characters',
      icon: icon_characters,
    }),
    renderMenuOption({
      el: RouterLink,
      to: 'Setting',
      label: '设置',
      key: 'Setting',
      icon: icon_setting,
    }),
  ]

  const menuOptions = computed<MenuOption[]>(() => {
    return [...defaultMenuOptions, ...(customMenuOptions.value as MenuOption[])]
  })

  return { menuOptions }
}
