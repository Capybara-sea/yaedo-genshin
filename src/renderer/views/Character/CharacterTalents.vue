<template>
  <div class="talents-container">
    <!-- 技能列表 -->
    <n-scrollbar x-scrollable>
      <div class="tabs-bar">
        <div
          class="tabs-bar-item"
          :class="{ active: currentTabKey === key }"
          v-for="(image, key) in character.talents.images"
          :key="image"
          @click="currentTabKey = key"
        >
          <my-talent-icon class="tabs-bar-item-icon" :src="image" :active="currentTabKey === key" />
          <div class="tabs-bar-item-name">{{ character.talents[key]?.name }}</div>
        </div>
      </div>
    </n-scrollbar>
    <!-- 技能介绍 -->
    <my-transition>
      <div :key="talentDetail.info" class="tabs-content">
        <div class="tabs-content-md">
          <md :content="talentDetail.info" />
          <md
            v-if="talentDetail.description"
            :content="`${talentDetail.description}`"
            class="tabs-content-md-des"
          />
        </div>
        <!-- 详细属性 -->
        <n-card class="tabs-content-data" v-if="talentDetail.attributes">
          <n-tabs class="tabs-content-data-change" type="line" v-model:value="dataType">
            <!-- 计算 -->
            <n-tab-pane name="计算" display-directive="show:lazy">
              <slider-costs-layout :costs="talentCost" :all-costs="talentCostAll">
                <template #slider-label>
                  <h4>等级</h4>
                  <p style="color: #dc5">{{ talentLevel }}</p>
                </template>
                <template #slider>
                  <n-slider
                    v-model:value="talentLevel"
                    :min="sliderConfig.min"
                    :max="sliderConfig.max"
                    :marks="sliderConfig.marks"
                    :tooltip="false"
                  />
                </template>
                <template #grid>
                  <div v-for="(item, i) in talentCalc" :key="item.label">
                    <n-divider v-if="i !== 0" dashed style="margin: 0.4rem 0" />
                    <span>{{ item.label }}</span>
                    <span style="float: right">{{ item.value }}</span>
                  </div>
                </template>
              </slider-costs-layout>
            </n-tab-pane>

            <!-- 表格 -->
            <n-tab-pane name="表格" display-directive="show:lazy">
              <div class="tabs-content-data-body">
                <n-collapse style="margin: -8px">
                  <n-collapse-item title="详细属性">
                    <n-scrollbar x-scrollable>
                      <talent-detail-grid :talent-detail="talentDetail" />
                    </n-scrollbar>
                  </n-collapse-item>
                </n-collapse>
              </div>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </div>
    </my-transition>
  </div>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

import { useTalents } from './hooks'
import SliderCostsLayout from './components/SliderCostsLayout.vue'
import TalentDetailGrid from './components/TalentDetailGrid.vue'

const props = defineProps<{
  character: Character
}>()

const {
  sliderConfig,
  currentTabKey,
  talentDetail,
  talentLevel,
  talentCalc,
  talentCost,
  talentCostAll,
} = useTalents(props.character)

const dataType = ref('计算')
</script>

<style lang="scss" scoped>
.talents-container {
  width: 100%;
  .tabs-bar {
    display: flex;
    gap: 2rem;
    padding: 1rem;

    .tabs-bar-item {
      min-width: 5rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      &-icon {
        width: 3.5rem;
        height: 3.5rem;
        margin-bottom: 0.5rem;
      }
    }
  }

  .tabs-content {
    padding: 0 1rem;
    text-align: left;

    &-md {
      margin-bottom: 1rem;
      &-des {
        margin-top: 1rem;
        font-style: italic;
        opacity: 0.8;
      }
    }

    &-data {
      &-change {
        margin-top: -0.6rem;
      }

      &-body {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
