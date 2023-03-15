<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="menuWidth.close"
    :width="menuWidth.open"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :inverted="!isDark"
      :value="currentRoute"
      :collapsed="collapsed"
      :collapsed-width="menuWidth.close"
      :icon-size="iconSize.open"
      :collapsed-icon-size="iconSize.close"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSideMenu } from '@/hooks/useSideMenu'
import { NMenu, NLayoutSider } from 'naive-ui'
import { useTheme } from '@/hooks/useTheme'

// theme
const { isDark } = useTheme()

// menu
const { menuOptions, currentRoute } = useSideMenu()
const menuWidth = { open: 180, close: 64 } // 侧栏宽度
const iconSize = { open: 26, close: 30 } // 图标大小

const collapsed = ref(false)
</script>
