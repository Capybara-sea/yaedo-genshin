<template>
  <div class="cons-container">
    <n-scrollbar x-scrollable>
      <div class="tabs-bar">
        <img
          v-for="(image, key) in character.constellations.images"
          :key="image"
          :src="image"
          @click="currentTabKey = key"
        />
      </div>
    </n-scrollbar>
    <div class="taps-content">
      {{ constellation }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

const props = defineProps<{ character: Character }>()

const currentTabKey = ref('c1')

const constellation = computed(() => {
  return props.character.constellations[currentTabKey.value]
})
</script>

<style lang="scss" scoped>
.cons-container {
  width: 100%;
  .tabs-bar {
    display: flex;
    gap: 2rem;
    padding: 0 1rem 1rem;
    > img {
      height: 3rem;
    }
  }

  .tabs-content {
    padding: 0 1rem;
  }
}
</style>
