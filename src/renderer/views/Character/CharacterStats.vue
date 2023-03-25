<template>
  <n-el tag="div" class="stats-container" :class="desColumn" ref="statsRef">
    {{ desColumn }}
    <!-- 拖动条 -->
    <div class="slider-box">
      <div class="slider-box-label">
        <h4>等级</h4>
        <p style="color: #dc5">{{ calculatedLevelSlider.str }}</p>
      </div>
      <n-slider
        v-model:value="currentLevelSliderValue"
        :min="sliderConfig.min"
        :max="sliderConfig.max"
        :default-value="sliderConfig.max"
        :marks="sliderConfig.marks"
        :tooltip="false"
      />
    </div>

    <!-- 表格 -->
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

    <!-- 花费 -->
    <div class="cost-box">
      <div class="cost-box-header">
        <h4>突破材料</h4>
        <div class="cost-box-header-switch">
          <div style="margin-right: 0.5rem">显示全部</div>
          <n-switch v-model:value="displayAllCosts"></n-switch>
        </div>
      </div>
      <div class="cost-box-container">
        <transition-group name="list">
          <div
            class="cost-box-container-item"
            v-for="item in displayAllCosts ? allCosts : costs"
            :key="item.name"
          >
            <img
              :src="getMaterial('name', item.name)?.images.icon"
              style="width: 1.8rem; height: 1.8rem; object-fit: contain"
            />
            {{ item.name }} * {{ item.count }}
          </div>
        </transition-group>
      </div>
    </div>
  </n-el>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

import { useAppDataStore } from '@/store'
import { useCharacterStats, useBreakpoints } from '@/hooks'
const props = defineProps<{ character: Character }>()
// 材料getter @returns {Material}
const { getMaterial } = useAppDataStore()
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

// 拖动条的响应式布局
const statsRef = ref<HTMLElement>()
const desColumn = useBreakpoints({ s: 'singleColumn' }, statsRef)
</script>

<style lang="scss" scoped>
.stats-container {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'slider cost'
    'stats cost';
  gap: 0.8rem;
  &.singleColumn {
    grid-template-columns: 1fr;
    grid-template-areas:
      'slider'
      'stats'
      'cost';
  }

  // 格子内所有元素规定页边距等
  > div {
    border-radius: var(--border-radius);
    border: 1px solid var(--divider-color);
    padding: 0.5rem 1rem;
  }

  .slider-box {
    grid-area: slider;
    display: grid;
    grid-template-columns: 4rem 1fr;
    background-color: var(--table-header-color);

    &-label {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--text-color);
    }
  }

  .stats-grid {
    grid-area: stats;
    align-self: self-start;
  }

  .cost-box {
    grid-area: cost;
    overflow: hidden;
    padding: 0;

    &-header {
      display: flex;
      justify-content: space-between;
      background: var(--table-header-color);
      border-bottom: 1px solid var(--divider-color);
      padding: 0.5rem 1rem;

      &-switch {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }

    &-container {
      padding: 0.5rem 1rem;
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
