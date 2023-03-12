<template>
  <div>
    <n-result title="这是一个首页" description="关于首页放什么我也没有想好...">
      <template #icon><div style="height: 35vh" /></template>
    </n-result>

    <img v-for="src in srcs" :key="src" :src="src" />
  </div>
</template>

<script lang="ts" setup>
import { NResult } from 'naive-ui'

const srcs = [
  'yaedo://images/character-10000078-splash.webp',
  'yaedo://images/character-10000076-splash.webp',
  'yaedo://images/character-10000075-splash.webp',
]
</script>
