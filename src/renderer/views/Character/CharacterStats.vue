<template>
  <slider-costs-layout class="stats-container" :costs="costs" :all-costs="allCosts">
    <template #slider-label>
      <h4>等级</h4>
      <p style="color: var(--yg-strong-color)">{{ calculatedLevelSlider.str }}</p>
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
            <character-statistic
              label="生命值"
              :value="statsFormat?.hp"
              :rank="character?.rank?.hp"
            />
          </n-col>
          <n-col :span="12">
            <character-statistic
              label="攻击力"
              :value="statsFormat?.attack"
              :rank="character?.rank?.attack"
            />
          </n-col>
        </n-row>
        <n-row>
          <n-col :span="12">
            <character-statistic
              label="防御力"
              :value="statsFormat?.defense"
              :rank="character?.rank?.defense"
            />
          </n-col>
          <n-col :span="12">
            <character-statistic
              :label="statsFormat?.specializedName"
              :value="statsFormat?.specialized"
            />
          </n-col>
        </n-row>
      </div>
    </template>

    <template name="test">
      <div>test</div>
    </template>
    <template #test>
      <div>test</div>
    </template>
  </slider-costs-layout>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

import SliderCostsLayout from './components/SliderCostsLayout.vue'
import CharacterStatistic from './components/CharacterStatistic.vue'

import { useCharacterStats } from './hooks'

const props = defineProps<{
  character: Character
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
