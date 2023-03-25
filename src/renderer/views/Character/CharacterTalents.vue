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
        <md :content="talentDetail.info" />
        <md :content="talentDetail.description || ''" />
        <!-- 详细属性 -->
        <n-collapse v-if="talentDetail.attributes">
          <n-collapse-item title="详细属性">
            <n-scrollbar x-scrollable>
              <n-table :bordered="false" :single-line="false" size="small">
                <thead>
                  <tr>
                    <th v-for="str in talentDetail.table?.header" :key="str">{{ str }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in talentDetail.table?.body" :key="row[0]">
                    <td v-for="col in row" :key="col">{{ col }}</td>
                  </tr>
                </tbody>
              </n-table>
            </n-scrollbar>
          </n-collapse-item>
        </n-collapse>
      </div>
    </my-transition>
  </div>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

import { useTalents } from '@/hooks'

const props = defineProps<{ character: Character }>()

const { currentTabKey, talentDetail } = useTalents(props.character)
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
  }
}
</style>
