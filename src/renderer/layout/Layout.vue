<template>
  <n-layout has-sider class="app-container">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="side">
        <n-menu
          v-model:value="activeKey"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
      </div>
    </n-layout-sider>
    <n-layout-content>
      <div class="content">
        <router-view></router-view>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'

import { ref } from 'vue'
import { NMenu, NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'

const activeKey = ref('Home')
const collapsed = ref(false)
const menuOptions: MenuOption[] = [
  {
    label: '主页',
    key: 'Home',
  },
  {
    label: '角色',
    key: 'Characters',
  },
]
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
}
</style>
