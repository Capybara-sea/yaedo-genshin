<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="menuCollapsedWidth"
    :width="menuWidth"
    :collapsed="collapsed"
    show-trigger
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <n-menu
      :inverted="!isDark"
      v-model:value="activeKey"
      :collapsed="collapsed"
      :collapsed-width="menuCollapsedWidth"
      :icon-size="26"
      :collapsed-icon-size="30"
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
const { menuOptions } = useSideMenu()
const menuWidth = 140 // 宽度
const menuCollapsedWidth = 64 // 收起宽度
const activeKey = ref('Home')
const collapsed = ref(false)
</script>

<style lang="scss" scoped></style>
