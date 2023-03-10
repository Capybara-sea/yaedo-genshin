<template>
  <n-layout has-sider class="app-container">
    <side-menu></side-menu>
    <n-layout-content>
      <div class="content">
        <router-view class="view" v-slot="{ Component, route }">
          <transition name="slide-fade" mode="out-in">
            <component :is="Component" :key="route.path" />
          </transition>
        </router-view>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script lang="ts" setup>
import SideMenu from './SideMenu.vue'
import { NLayout, NLayoutContent } from 'naive-ui'
</script>

<style lang="scss" scoped>
.app-container {
  height: 100vh;

  .slide-fade- {
    &enter-active,
    &leave-active {
      transition: opacity 0.15s ease-in-out 0.05s, transform 0.2s ease-in;
    }
    &enter-from,
    &leave-to {
      transform: translateX(20px);
      opacity: 0;
    }
    &enter-to,
    &leave-from {
      opacity: 1;
    }
  }
}
</style>
