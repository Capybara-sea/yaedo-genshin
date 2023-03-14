<template>
  <div class="characters-container">
    <div v-for="character in filterCharacters" :key="character.id">
      <item-card
        :name="character.name"
        :icon="character.images.icon"
        :rarity="character.rarity"
        :element="character.element"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Character } from '@/../types/data'

import { ref, computed } from 'vue'
import ItemCard from '@/components/ItemCard.vue'

const characters = ref<Character[]>([])
window.api.AppData.get<Character[]>('characters').then((CharacterData) => {
  characters.value = CharacterData
})

const search = ref('')
const filterCharacters = computed(() => {
  return characters.value.filter((character) => {
    return character.name.includes(search.value)
  })
})
</script>

<style lang="scss" scoped>
.characters-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, 120px);
  gap: 16px;
  justify-content: center;
}
</style>
