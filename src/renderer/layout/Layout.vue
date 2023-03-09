<template>
  <n-layout has-sider class="app-container">
    <!-- TODO 把sideMenu拆分出去 -->
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
        <router-view class="view" v-slot="{ Component, route }">
          <transition name="fade" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import type { MenuOption } from 'naive-ui'

import { h, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { NMenu, NLayout, NLayoutContent, NLayoutSider } from 'naive-ui'

const activeKey = ref('Home')
const collapsed = ref(false)

interface RenderMenuOption {
  el: any
  to: string
  label: string
  key: string
}
const renderMenuOption = (option: RenderMenuOption): MenuOption => {
  return {
    label: () => h(option.el, { to: { name: option.to } }, { default: () => option.label }),
    key: option.key,
  }
}

const menuOptions: MenuOption[] = [
  renderMenuOption({ el: RouterLink, to: 'Home', label: '首页', key: 'Home' }),
  renderMenuOption({ el: RouterLink, to: 'Characters', label: '角色', key: 'Characters' }),
]
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.14s ease-in;
}
</style>
