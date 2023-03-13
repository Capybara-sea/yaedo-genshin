<template>
  <n-card class="item-card-container" hoverable :bordered="false" :content-style="contentStyle">
    <template #cover>
      <img v-if="icon" :src="icon" :style="iconStyle" loading="lazy" />
      <img :src="starIcon" class="star-icon" />
    </template>
    {{ name }}
  </n-card>
</template>

<script lang="ts" setup>
import { defineProps, computed, StyleValue } from 'vue'
import { NCard } from 'naive-ui'
import { rarity_1, rarity_2, rarity_3, rarity_4, rarity_5 } from '@/assets/icons'

const props = defineProps<{
  name: string
  icon?: string
  rarity?: '1' | '2' | '3' | '4' | '5'
}>()

const contentStyle = { padding: '0.5rem' }

const starIcon = computed(() => {
  return {
    1: rarity_1,
    2: rarity_2,
    3: rarity_3,
    4: rarity_4,
    5: rarity_5,
  }[props.rarity || '1']
})

const iconBackground = {
  1: '#818486',
  2: '#5a977a',
  3: '#5987ad',
  4: '#9470bb',
  5: '#c87c24',
}

const iconStyle = computed<StyleValue>(() => {
  return {
    background: iconBackground[props.rarity || '1'],
    backgroundImage: 'linear-gradient(136deg,rgba(49,43,71,.53),transparent)',
    borderBottomRightRadius: '.5rem',
  }
})
</script>

<style lang="scss" scoped>
.item-card-container {
  background: linear-gradient(0deg, #e9e5dc calc(100% - 1rem), transparent 1rem);
  color: #4a5366;
  font-weight: 600;
  border-radius: 0.5rem;
  overflow: hidden;

  .star-icon {
    object-fit: contain;
    height: 1.2rem;
    margin-bottom: -1.2rem;
    transform: translateY(-100%);
  }
}
</style>
