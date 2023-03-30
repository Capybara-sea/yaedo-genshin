<template>
  <div class="weapons-container">
    <!-- 角色列表 -->
    <div style="z-index: 10">
      <!-- 未折叠 -->
      <n-collapse-transition :show="!$route.params.id">
        <filter-bar class="filter-bar" :origin="weapons" v-model:value="filterWeapons" />
        <div class="weapons-box">
          <div v-for="Character in filterWeapons" :key="Character.id">
            <item-card
              :name="Character.name"
              :icon="Character.images.icon"
              :rarity="Character.rarity"
              @click="$router.push({ name: 'Character', params: { id: Character.id } })"
            />
          </div>
        </div>
      </n-collapse-transition>
      <!-- 折叠 -->
      <n-collapse-transition :show="!!$route.params.id">
        <n-page-header title="返回" @back="$router.back" />
      </n-collapse-transition>
    </div>

    <!-- 角色详情 -->
    <div style="z-index: 0">
      <router-view v-if="$route.params.id"></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Weapon } from '@/types'
import ItemCard from '@/components/ItemCard.vue'
import FilterBar from './components/FilterBar.vue'
import { useAppDataStore } from '@/store'

const { weapons } = useAppDataStore()
const filterWeapons = ref<Weapon[]>(weapons)
</script>

<style lang="scss" scoped>
.weapons-container {
  > div {
    position: relative;
  }

  .filter-bar {
    margin-bottom: 16px;
  }

  .weapons-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    gap: 16px;
    justify-content: center;
  }
}
</style>
