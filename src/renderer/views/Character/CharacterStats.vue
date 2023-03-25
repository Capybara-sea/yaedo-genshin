<template>
  <slider-costs-layout class="stats-container" :costs="costs" :all-costs="allCosts">
    <template #slider-label>
      <h4>等级</h4>
      <p style="color: #dc5">{{ calculatedLevelSlider.str }}</p>
    </template>
    <template #slider>
      <n-slider
        v-model:value="currentLevelSliderValue"
        :min="sliderConfig.min"
        :max="sliderConfig.max"
        :default-value="sliderConfig.max"
        :marks="sliderConfig.marks"
        :tooltip="false"
      />
    </template>
    <template #grid>
      <div class="stats-grid">
        <n-row>
          <n-col :span="12">
            <n-statistic label="生命值" :value="statsFormat?.hp" />
          </n-col>
          <n-col :span="12">
            <n-statistic label="攻击力" :value="statsFormat?.defense" />
          </n-col>
        </n-row>
        <n-row>
          <n-col :span="12">
            <n-statistic label="防御力" :value="statsFormat?.attack" />
          </n-col>
          <n-col :span="12">
            <n-statistic :label="statsFormat?.specializedName" :value="statsFormat?.specialized" />
          </n-col>
        </n-row>
      </div>
    </template>
  </slider-costs-layout>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

import { useCharacterStats } from './hooks'
import SliderCostsLayout from './components/SliderCostsLayout.vue'

const props = defineProps<{
  character: Character
  singleColumn: Boolean // 是否单行，用于响应式布局
}>()

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
