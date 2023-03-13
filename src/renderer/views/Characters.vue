<template>
  <div>
    <div v-for="character in characters" :key="character.id">
      <div>{{ character.name }}</div>
      <div>{{ character.images.icon }}</div>
      <img :src="character.images.icon" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Character } from '@/../types/data/characters'
import { ref } from 'vue'

const characters = ref<Character[]>([])
window.api.AppData.get<Character[]>('characters').then((CharacterData) => {
  characters.value = CharacterData
})
</script>
