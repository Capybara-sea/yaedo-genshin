<template>
  <div class="cons-container" ref="ConsRef">
    <div class="cons-list">
      <div class="cons-list-item" :class="{ singleColumn }" v-for="con in cons" :key="con.name">
        <my-talent-icon class="cons-list-item-icon" :src="con.image" />
        <div class="cons-list-item-name">{{ con.name }}</div>
        <md class="cons-list-item-content" :content="con.effect" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Character, ConstellationKey, ConstellationDetail } from '@/types/data'

import { useBreakpoints } from '@/hooks'
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

const ConsRef = ref<HTMLElement>()
const singleColumn = useBreakpoints({ s: true }, ConsRef)
</script>

<style lang="scss" scoped>
.cons-container {
  .cons-list {
    &-item {
      display: grid;
      grid-template-columns: 5rem 9rem 1fr;
      align-items: center;
      gap: 2rem;
      padding: 0.5rem 0;
      min-height: 4rem;

      &-icon {
        width: 3.5rem;
        height: 3.5rem;
        justify-self: end;
      }

      &-name,
      &-content {
        text-align: left;
      }

      // hover样式
      transition: all 0.3s ease-in-out;
      border-radius: var(--border-radius);
      &:hover {
        background-color: var(--table-header-color);
      }
    }

    &-item.singleColumn {
      display: grid;
      grid-template-columns: 5rem 1fr;
      grid-template-rows: auto auto;
      grid-template-areas:
        'icon content'
        'name content';
      gap: 0.5rem;

      .cons-list-item-icon {
        grid-area: icon;
        justify-self: center;
      }

      .cons-list-item-name {
        grid-area: name;
        text-align: center;
      }

      .cons-list-item-content {
        grid-area: content;
      }
    }
  }
}
</style>
