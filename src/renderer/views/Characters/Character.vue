<template>
  <div v-if="selectedCharacter" class="character-container">
    <div class="header">
      <div
        class="cover-background"
        :style="`background-image: url(${selectedCharacter.images.card})`"
      />
      <img class="cover-img" :src="selectedCharacter.images.splash" />
      <div class="base">
        <div class="name">
          <img :src="uiMapping(selectedCharacter.element)" />
          {{ selectedCharacter.name }}
        </div>
        <div class="title">{{ selectedCharacter.title }}</div>
        <img class="rarity" :src="uiMapping('rarity' + selectedCharacter.rarity)" />
        <div class="tag">
          <n-tag v-if="selectedCharacter.region" :bordered="false" round strong>{{
            selectedCharacter.region
          }}</n-tag>
          <n-tag v-if="selectedCharacter.weapontype" :bordered="false" round strong>{{
            selectedCharacter.weapontype
          }}</n-tag>
        </div>
        <div class="description">{{ selectedCharacter.description }}</div>
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
      <n-descriptions-item label="所属">{{ selectedCharacter.affiliation }}</n-descriptions-item>
      <n-descriptions-item label="命星">{{ selectedCharacter.constellation }}</n-descriptions-item>
      <n-descriptions-item label="生日">{{ selectedCharacter.birthday }}</n-descriptions-item>
      <n-descriptions-item label="版本">{{ selectedCharacter.version }}</n-descriptions-item>
    </n-descriptions>

    <n-grid>
      <n-grid-item span="12">
        <n-descriptions
          bordered
          :column="2"
          size="small"
          label-placement="left"
          title="基础属性"
          label-align="center"
          label-style="width: 20%"
          content-style="width: 30%"
        >
          <n-descriptions-item :span="2">
            <template #label>
              <p>等级</p>
              <p style="color: #dc5">{{ calculatedLevelSlider.str }}</p>
            </template>
            <n-slider
              v-model:value="currentLevelSliderValue"
              :min="sliderConfig.min"
              :max="sliderConfig.max"
              :default-value="sliderConfig.max"
              :marks="sliderConfig.marks"
              :format-tooltip="() => calculatedLevelSlider.str"
            />
          </n-descriptions-item>
          <n-descriptions-item label="生命">{{ stats.hp }}</n-descriptions-item>
          <n-descriptions-item label="攻击">{{ stats.defense }}</n-descriptions-item>
          <n-descriptions-item label="防御">{{ stats.attack }}</n-descriptions-item>
          <n-descriptions-item label="防御">{{ stats.specialized }}</n-descriptions-item>
        </n-descriptions>
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
import { useRoute } from 'vue-router'
import { useAppDataStore } from '@/store'
import { uiMapping } from '@/utils/ui'
import { NDescriptions, NDescriptionsItem, NTag, NGrid, NGridItem, NSlider } from 'naive-ui'
import { useStats } from './Character'

const route = useRoute()
const appDataStore = useAppDataStore()

// 获取角色数据
const selectedCharacter = appDataStore.getCharacterById(route.params.id as string)

const { stats, sliderConfig, calculatedLevelSlider, currentLevelSliderValue } =
  useStats(selectedCharacter)
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
