<template>
  <div class="slider-costs-layout-container" :class="{ singleColumn }" ref="SliderCostsLayoutRef">
    <!-- 拖动条 -->
    <div class="slider-box">
      <div class="slider-box-label">
        <slot name="slider-label" />
      </div>
      <slot name="slider" />
    </div>

    <!-- 表格 -->
    <div class="stats-grid">
      <slot name="grid" />
    </div>

    <!-- 花费 -->
    <slot name="costs">
      <costs-box class="costs-box" v-bind="$attrs" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { useBreakpoints } from '@/hooks'
import CostsBox from './CostsBox.vue'

const SliderCostsLayoutRef = ref<HTMLElement>()
const singleColumn = useBreakpoints({ s: true }, SliderCostsLayoutRef)
</script>

<style lang="scss" scoped>
.slider-costs-layout-container {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'slider costs'
    'stats costs';
  gap: 0.8rem;
  &.singleColumn {
    grid-template-columns: 1fr;
    grid-template-areas:
      'slider'
      'stats'
      'costs';
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
    align-items: center;
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

  .costs-box {
    grid-area: costs;
    padding: 0;
  }
}
</style>
