<template>
  <div v-if="character" class="character-container">
    <div class="header">
      <div class="cover-background" :style="`background-image: url(${character.images.card})`" />
      <img class="cover-img" :src="character.images.splash" />
      <div class="base">
        <div class="name">
          <img :src="uiMapping(character.element)" />
          {{ character.name }}
        </div>
        <div class="title">{{ character.title }}</div>
        <img class="rarity" :src="uiMapping('rarity' + character.rarity)" />
        <div class="tag">
          <n-tag v-if="character.region" :bordered="false" round strong>{{
            character.region
          }}</n-tag>
          <n-tag v-if="character.weapontype" :bordered="false" round strong>{{
            character.weapontype
          }}</n-tag>
        </div>
        <div class="description">{{ character.description }}</div>
      </div>
    </div>

    <n-descriptions
      bordered
      :column="4"
      style="margin-top: 20px"
      label-align="center"
      size="small"
      title="基本信息"
      label-placement="left"
    >
      <n-descriptions-item label="所属">{{ character.affiliation }}</n-descriptions-item>
      <n-descriptions-item label="命星">{{ character.constellation }}</n-descriptions-item>
      <n-descriptions-item label="生日">{{ character.birthday }}</n-descriptions-item>
      <n-descriptions-item label="版本">{{ character.version }}</n-descriptions-item>
    </n-descriptions>

    <n-grid>
      <n-grid-item span="12">
        <!-- <n-descriptions bordered :column="2" size="small" title="基础属性">
          <n-descriptions-item label="生命">{{ character }}</n-descriptions-item>
          <n-descriptions-item label="攻击">{{ character }}</n-descriptions-item>
          <n-descriptions-item label="防御">{{ character }}</n-descriptions-item>
        </n-descriptions> -->
      </n-grid-item>
      <n-grid-item span="12">
        <!-- <n-descriptions bordered :column="2" size="small" title="成长属性">
          <n-descriptions-item label="生命">{{ character }}</n-descriptions-item>
          <n-descriptions-item label="攻击">{{ character }}</n-descriptions-item>
          <n-descriptions-item label="防御">{{ character }}</n-descriptions-item>
        </n-descriptions> -->
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
import type { AppData } from '@/types'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { NDescriptions, NDescriptionsItem, NTag, NGrid, NGridItem } from 'naive-ui'
import { uiMapping } from '@/utils/ui'

const route = useRoute()

// 获取角色数据
const characters = ref<AppData['characters']>([])
window.api.AppData.get('characters').then((data) => {
  characters.value = data
})

// 获取角色数据
const character = computed(() => {
  const id = route.params.id as string
  return id ? characters.value.find((character) => character.id === id) : undefined
})
</script>

<style lang="scss" scoped>
.character-container {
  .header {
    position: relative;
    display: flex;
    // border: 2px solid #ffffff10;
    border-radius: 12px;

    margin-top: 50px;

    .cover-background {
      z-index: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      filter: brightness(0.8) contrast(0.9);
      background-size: cover;
      background-position: center;
    }
    .cover-img {
      --over-top: 90px;
      --over-left: 40px;
      z-index: 1;
      margin-top: calc(var(--over-top) * -1);
      margin-left: calc(var(--over-left) * -1);
      width: calc(80% + var(--over-left));
      height: clamp(100px, calc(40vw + var(--over-top)), 600px);
      object-fit: contain;
      object-position: left bottom;
      overflow: visible;
      transition: all 0.3s ease-in-out;
      filter: drop-shadow(16px 16px 4px rgba(0, 0, 0, 0.3));
      &:hover {
        filter: drop-shadow(20px 20px 2px rgba(0, 0, 0, 0.3));
      }
    }
    .base {
      z-index: 2;
      padding: 1rem 2rem;
      pointer-events: none;

      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .name {
        font-size: 3rem;
        font-weight: 900;

        display: flex;
        align-items: center;
        > img {
          width: 3rem;
          height: 3rem;
          margin-right: 0.5rem;
        }
      }
      .title {
        font-size: 2rem;
        font-weight: 400;
        filter: brightness(0.8);
      }
      .rarity {
        height: 1.6rem;
      }
      .tag {
        margin-top: 0.8rem;
        display: flex;
        gap: 0.6rem;
      }
      .description {
        max-width: 35%;
        margin-top: auto;
        margin-bottom: 0.8rem;
        font-size: 1rem;
        text-align: end;
        color: #fff;
        background-color: #0002;
        padding: 0.4rem;
        border-radius: 8px;
        filter: brightness(0.8);
        backdrop-filter: blur(4px);
      }
    }
  }
}
</style>
