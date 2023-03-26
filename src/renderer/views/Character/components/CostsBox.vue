<template>
  <div class="costs-box">
    <div class="costs-box-header">
      <h4>突破材料</h4>
      <div class="costs-box-header-switch">
        <div style="margin-right: 0.5rem">显示累计</div>
        <n-switch v-model:value="displayAllCosts" />
      </div>
    </div>
    <div class="costs-box-container" v-if="displayAllCosts ? allCosts : costs">
      <transition-group name="list">
        <div
          class="costs-box-container-item"
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
    <div v-else class="costs-box-container"><br /></div>
  </div>
</template>

<script lang="ts" setup>
import type { Items } from '@/types'

import { useAppDataStore } from '@/store'

defineProps<{
  costs?: Items[]
  allCosts?: Items[]
}>()

// 材料getter @returns {Material}
const { getMaterial } = useAppDataStore()

const displayAllCosts = ref(false)
</script>

<style lang="scss" scoped>
.costs-box {
  grid-area: cost;
  overflow: hidden;
  padding: 0;
  border: 1px solid var(--divider-color);

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
