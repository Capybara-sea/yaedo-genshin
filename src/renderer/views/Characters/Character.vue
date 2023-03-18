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

    <n-divider />

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

    <n-divider />

    <n-grid>
      <n-grid-item span="12">
        <n-descriptions
          bordered
          :column="2"
          size="small"
          label-placement="left"
          title="基础属性"
          label-align="center"
          label-style="width: 25%"
          content-style="width: 25%"
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
          <n-descriptions-item label="生命值">{{ statsFormat?.hp }}</n-descriptions-item>
          <n-descriptions-item label="攻击力">{{ statsFormat?.defense }}</n-descriptions-item>
          <n-descriptions-item label="防御力">{{ statsFormat?.attack }}</n-descriptions-item>
          <n-descriptions-item :label="statsFormat?.specializedName">
            {{ statsFormat?.specialized }}
          </n-descriptions-item>
        </n-descriptions>
      </n-grid-item>
      <n-grid-item span="12">
        显示全部
        <n-switch v-model:value="displayAllCosts"></n-switch>
        <transition-group name="list">
          <div v-for="item in displayAllCosts ? allCosts : costs" :key="item.name">
            {{ item.name }} * {{ item.count }}
          </div>
        </transition-group>
      </n-grid-item>
    </n-grid>

    <n-divider />

    <div>
      <img
        v-for="image in selectedCharacter.talents.images"
        :key="image"
        :src="image"
        style="height: 3rem"
      />
    </div>

    <n-divider />

    <div>
      <img
        v-for="image in selectedCharacter.constellations.images"
        :key="image"
        :src="image"
        style="height: 3rem"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAppDataStore } from '@/store'
import { uiMapping } from '@/utils/ui'
import { useStats, useTalents } from './Character'
import {
  NTag,
  NGrid,
  NGridItem,
  NSlider,
  NSwitch,
  NDivider,
  NDescriptions,
  NDescriptionsItem,
} from 'naive-ui'

const route = useRoute()
const appDataStore = useAppDataStore()

// 获取角色数据
const selectedCharacter = appDataStore.getCharacterById(route.params.id as string)

// 是否显示全部材料
const displayAllCosts = ref(false)
// 角色基础数据的一些 UI 映射
const {
  costs,
  allCosts,
  statsFormat,
  sliderConfig,
  calculatedLevelSlider,
  currentLevelSliderValue,
} = useStats(selectedCharacter!)

// 天赋数据
const talents = useTalents(selectedCharacter!)
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

  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 0.3s ease-in-out;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
