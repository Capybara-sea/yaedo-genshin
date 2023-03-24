<template>
  <n-grid>
    <n-grid-item span="12">
      <n-descriptions
        bordered
        :column="2"
        size="small"
        label-placement="left"
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
            :tooltip="false"
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
      <n-card class="cost-box" title="突破材料" size="small" header-style="text-align: left">
        <template #header-extra>
          <div>显示全部</div>
          <n-switch v-model:value="displayAllCosts"></n-switch>
        </template>
        <div class="cost-box-container">
          <transition-group name="list">
            <div
              class="cost-box-container-item"
              v-for="item in displayAllCosts ? allCosts : costs"
              :key="item.name"
            >
              <img :src="getMaterial('name', item.name)?.images.icon" />
              {{ item.name }} * {{ item.count }}
            </div>
          </transition-group>
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

import { useAppDataStore } from '@/store'
import { useCharacterStats } from '@/hooks'

const { getMaterial } = useAppDataStore()

const props = defineProps<{ character: Character }>()

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
} = useCharacterStats(props.character!)
</script>

<style lang="scss" scoped>
.cost-box-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  grid-gap: 0.5rem;

  &-item {
    display: flex;
    align-items: center;
    img {
      object-fit: contain;
      width: 1.8rem;
      height: 1.8rem;
      margin-right: 0.5rem;
    }
  }
}
.list {
  &-move,
  &-enter-active,
  &-leave-active {
    transition: all 0.3s ease-in-out;
  }

  &-enter-from,
  &-leave-to {
    opacity: 0;
    transform: scale(0.8);
  }
}
</style>
