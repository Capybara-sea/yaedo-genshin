<template>
  <div>
    <router-view></router-view>
    <div class="characters-container">
      <div v-for="character in filterCharacters" :key="character.id">
        <item-card
          :name="character.name"
          :icon="character.images.icon"
          :rarity="character.rarity"
          :element="character.element"
          @click="$router.push({ name: 'Character', params: { id: character.id } })"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AppData } from '@/typings'

import { ref, computed } from 'vue'
import ItemCard from '@/components/ItemCard.vue'

const characters = ref<AppData['characters']>([])
window.api.AppData.get('characters').then((data) => {
  characters.value = data
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
