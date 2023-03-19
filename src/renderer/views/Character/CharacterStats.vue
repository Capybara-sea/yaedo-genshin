<template>
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
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

import { useCharacterStats } from '@/hooks/useAppData'

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
