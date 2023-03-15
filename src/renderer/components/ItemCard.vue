<template>
  <n-card class="item-card-container" hoverable :bordered="false" :content-style="contentStyle">
    <template #cover>
      <div class="cover">
        <div class="icon-box" :style="iconBackground">
          <img v-if="icon" :src="icon" loading="lazy" />
        </div>
        <img v-if="_subIcon" :src="_subIcon" loading="lazy" class="sub-icon-box" />
        <img :src="starIcon" class="star" />
      </div>
    </template>
    {{ name }}
  </n-card>
</template>

<script lang="ts" setup>
import type { StyleValue } from 'vue'
import type { Rarity, Element } from '@/../types/data'

import { computed } from 'vue'
import { NCard } from 'naive-ui'

const props = defineProps<{
  name: string
  icon?: string
  rarity?: Rarity
  subIcon?: string
  element?: Element
}>()

// 星星的图片地址
const starIcon = computed(() => `yaedo://images/ui_rarity_${props.rarity}.webp`)
// 文字框的样式
const contentStyle = { padding: '0.5rem' }

const rarityColor = {
  1: '#818486',
  2: '#5a977a',
  3: '#5987ad',
  4: '#9470bb',
  5: '#c87c24',
}
const iconBackground = computed<StyleValue>(() => ({
  background: rarityColor[props.rarity || '1'],
}))

enum ElementEnum {
  '火' = 'pyro',
  '水' = 'hydro',
  '风' = 'anemo',
  '雷' = 'electro',
  '草' = 'geo',
  '冰' = 'cryo',
  '岩' = 'dendro',
}
const _subIcon = computed(() => {
  if (props.subIcon) {
    return props.subIcon
  }
  if (props.element) {
    return `yaedo://images/ui_element_${ElementEnum[props.element]}_small.webp`
  }
  return undefined
})
</script>

<style lang="scss" scoped>
.item-card-container {
  background: linear-gradient(0deg, #e9e5dc calc(100% - 1rem), transparent 1rem);
  color: #4a5366;
  font-weight: 600;
  border-radius: 0.5rem;
  overflow: hidden;

  .cover {
    .icon-box {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      border-bottom-right-radius: '.5rem';
      > img {
        background-image: linear-gradient(136deg, rgba(49, 43, 71, 0.53), transparent);
      }
    }

    .sub-icon-box {
      position: absolute;
      top: 0.2em;
      left: 0.3em;
      width: 2rem;
      height: 2rem;
      object-fit: contain;
    }

    .star {
      object-fit: contain;
      height: 1.2rem;
      margin-bottom: -1.2rem;
      transform: translateY(-100%);
    }
  }
}
</style>
