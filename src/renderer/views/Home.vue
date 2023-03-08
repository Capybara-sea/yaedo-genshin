<template>
  <div class="character">
    <div class="character-item" v-for="character in characters" :key="character.id">
      <h2>{{ character.name }}</h2>
      <p>{{ character.title }}</p>
      <p>{{ character.description }}</p>
      <p>{{ character.region }}</p>
      <p>{{ character.constellation }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Character } from '../../types/data/characters'
import { ref } from 'vue'

const characters = ref<Character[]>([])

window.api.AppData.get<Character[]>('characters').then((data) => {
  characters.value = data
})
</script>

<style lang="scss" scoped>
.character {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  padding: 1rem;

  &-item {
    border: 1px solid #ccc;
  }
}
</style>
