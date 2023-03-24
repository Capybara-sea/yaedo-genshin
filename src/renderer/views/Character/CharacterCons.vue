<template>
  <div class="cons-container">
    <div class="cons-list">
      <div class="cons-list-item" v-for="con in cons" :key="con.name">
        <img class="cons-list-item-icon auto-icon-color" :src="con.image" />
        <div class="cons-list-item-name">{{ con.name }}</div>
        <md class="cons-list-item-content" :content="con.effect" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Character, ConstellationKey, ConstellationDetail } from '@/types/data'

const props = defineProps<{ character: Character }>()

const consKey: Array<ConstellationKey> = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']
const cons = computed(() => {
  const cons = props.character.constellations
  return consKey.map((key) => {
    const { name, effect } = cons[key] as ConstellationDetail
    const image = cons.images[key]
    return { name, effect, image }
  })
})
</script>

<style lang="scss" scoped>
.cons-container {
  .cons-list {
    &-item {
      display: grid;
      grid-template-columns: 5rem 9rem 1fr;
      align-items: center;
      gap: 2rem;
      min-height: 4rem;

      &-icon {
        width: 3.5rem;
        height: 3.5rem;
        object-fit: contain;
        justify-self: end;
      }

      &-name,
      &-content {
        text-align: left;
      }
    }
  }
}
</style>
