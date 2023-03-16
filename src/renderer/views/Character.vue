<template>
  <div v-if="character" class="character-container" :style="pageStyle">
    <div class="header">
      <img class="cover-img" :src="character.images.splash" />
      <div class="cover-background" />
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
      <n-descriptions-item label="名称" v-for="i in 10" :key="i">
        {{ character.name }}
      </n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import type { AppData } from '@/types'

import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { NDescriptions, NDescriptionsItem, NTag } from 'naive-ui'
import { uiMapping, colorMapping } from '@/utils/ui'

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

// 头图背景颜色
const pageStyle = computed(() => ({
  '--header-bg-color': colorMapping(character.value?.element) + '40',
}))
</script>

<style lang="scss" scoped>
.character-container {
  .header {
    position: relative;
    display: flex;
    border: 2px solid #ffffff10;
    border-radius: 12px;
    margin-top: 50px;

    .cover-background {
      z-index: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      overflow: hidden;
      background-repeat: no-repeat;
      background-image: linear-gradient(
          45deg,
          #ffffff10 25%,
          transparent 25%,
          transparent 75%,
          #ffffff10 75%,
          #ffffff10
        ),
        linear-gradient(0deg, var(--header-bg-color), #a6363600);
    }
    .cover-img {
      z-index: 1;
      width: 65%;
      height: 50vw;
      object-fit: cover;
      overflow: visible;
      margin-top: -70px;
      // margin-left: -40px;
    }
    .base {
      z-index: 2;
      padding: 1rem 2rem;

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
        margin-top: .8rem;
        display: flex;
        gap: 0.6rem;
      }
      .description {
        width: 35%;
        font-size: 1rem;
        font-weight: 400;
        filter: brightness(0.8);
        margin-top: auto;
        margin-bottom: .8rem;
        text-align: end;
        color: #fff;
        background-color: #0002;
        padding: .4rem;
        border-radius: 8px;
        backdrop-filter: blur(4px);
      }
    }
  }
}
</style>
