<script setup lang="ts">
import Layout from '@/layout/Layout.vue'
import { useTheme } from '@/hooks'
const { theme, themeOverrides } = useTheme()
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <Layout></Layout>
  </n-config-provider>
</template>
