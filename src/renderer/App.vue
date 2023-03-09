<script setup lang="ts">
import Layout from '@/layout/Layout.vue'
import { NConfigProvider } from 'naive-ui'
import { useTheme } from '@/hooks/useTheme'
const { theme, themeOverrides } = useTheme()
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <Layout></Layout>
  </n-config-provider>
</template>
