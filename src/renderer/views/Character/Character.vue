<template>
  <div v-if="selectedCharacter" class="character-container">
    <!-- 角色头部组件 -->
    <character-header :character="selectedCharacter" />

    <!-- 基本信息 -->
    <n-divider />
    <character-info :character="selectedCharacter" />

    <n-divider />
    <!-- 基础属性 -->
    <character-stats :character="selectedCharacter" />

    <n-divider />
    <!-- 天赋 -->
    <character-talents :character="selectedCharacter" />

    <n-divider />
    <!-- 命座 -->
    <character-cons :character="selectedCharacter" />
  </div>
</template>

<script lang="ts" setup>
import { useAppDataStore } from '@/store'
import CharacterHeader from './CharacterHeader.vue'
import CharacterInfo from './CharacterInfo.vue'
import CharacterStats from './CharacterStats.vue'
import CharacterTalents from './CharacterTalents.vue'
import CharacterCons from './CharacterCons.vue'

const route = useRoute()
const appDataStore = useAppDataStore()

// 获取角色数据
const selectedCharacter = appDataStore.getCharacterById(route.params.id as string)
</script>
