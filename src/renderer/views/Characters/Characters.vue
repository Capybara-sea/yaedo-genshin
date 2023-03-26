<template>
  <div class="characters-container">
    <!-- 角色列表 -->
    <div style="z-index: 10">
      <!-- 未折叠 -->
      <n-collapse-transition :show="!$route.params.id">
        <filter-bar class="filter-bar" :origin="characters" v-model:value="filterCharacters" />
        <div class="characters-box">
          <div v-for="Character in filterCharacters" :key="Character.id">
            <item-card
              :name="Character.name"
              :icon="Character.images.icon"
              :rarity="Character.rarity"
              :element="Character.element"
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
import type { Character } from '@/types'
import ItemCard from '@/components/ItemCard.vue'
import FilterBar from './components/FilterBar.vue'
import { useAppDataStore } from '@/store'

const { characters } = useAppDataStore()
const filterCharacters = ref<Character[]>(characters)
</script>

<style lang="scss" scoped>
.characters-container {
  > div {
    position: relative;
  }

  .filter-bar {
    margin-bottom: 16px;
  }

  .characters-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    gap: 16px;
    justify-content: center;
  }
}
</style>
