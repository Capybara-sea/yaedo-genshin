<template>
  <div v-if="character">{{ character.name }}</div>
</template>

<script lang="ts" setup>
import type { AppData } from '@/types'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 获取角色数据
const characters = ref<AppData['characters']>([])
window.api.AppData.get('characters').then((data) => {
  characters.value = data
})

// 获取角色数据
const character = computed(() => {
  const id = route.params.id as string
  return id ? characters.value.find((character) => character.id === id) : undefined
})
</script>
