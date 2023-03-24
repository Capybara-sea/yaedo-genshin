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
          <img class="icon auto-icon-color" :src="image" />
          <div class="name">{{ character.talents[key]?.name }}</div>
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
    padding: 0 1rem 1rem;

    .tabs-bar-item {
      min-width: 5rem;
      .icon {
        width: 3.5rem;
        height: 3.5rem;
        object-fit: contain;
        // background: #a0a5d6;
        border-radius: 9999px;
        padding: 0.2rem;
        transition: all 0.3s ease;
      }

      &.active {
        .icon {
          filter: unset;
          background: #a0a5d6;
        }
      }
    }
  }

  .tabs-content {
    padding: 0 1rem;
    text-align: left;
  }
}
</style>
