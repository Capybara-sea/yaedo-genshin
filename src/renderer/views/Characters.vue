<template>
  <div>
    <div>
      <n-button type="primary" @click="setTheme('light')">白</n-button>
      <n-button type="primary" @click="setTheme('dark')">黑</n-button>
    </div>
    <div v-for="character in characters" :key="character.id">
      <div>{{ character.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { NButton } from 'naive-ui'
import { useAppStore } from '@/store'
import type { Character } from '@/../types/data/characters'
import { ref } from 'vue'

const { setTheme } = useAppStore()

const characters = ref<Character[]>([])
window.api.AppData.get<Character[]>('characters').then((CharacterData) => {
  characters.value = CharacterData
})
</script>

<style lang="scss" scoped></style>
