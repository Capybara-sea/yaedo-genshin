<script setup lang="ts">
import Layout from '@/layout/Layout.vue'
import { useTheme } from '@/hooks'
const { theme, themeOverrides } = useTheme()
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-config-provider :theme-overrides="{ common: { fontFamily: 'genshin-font' } }">
      <n-global-style />
    </n-config-provider>
    <n-el tag="div">
      <Layout></Layout>
    </n-el>
  </n-config-provider>
</template>
