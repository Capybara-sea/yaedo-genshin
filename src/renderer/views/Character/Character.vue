<template>
  <div v-if="selectedCharacter" class="character-container">
    <!-- 角色头部组件 -->
    <character-header :character="selectedCharacter" />

    <n-divider />
    <!-- 基本信息 -->
    <n-descriptions
      bordered
      :column="4"
      style="margin-top: 20px"
      label-align="center"
      size="small"
      title="基本信息"
      label-placement="left"
    >
      <n-descriptions-item label="所属">{{ selectedCharacter.affiliation }}</n-descriptions-item>
      <n-descriptions-item label="命星">{{ selectedCharacter.constellation }}</n-descriptions-item>
      <n-descriptions-item label="生日">{{ selectedCharacter.birthday }}</n-descriptions-item>
      <n-descriptions-item label="版本">{{ selectedCharacter.version }}</n-descriptions-item>
    </n-descriptions>

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
import CharacterStats from './CharacterStats.vue'
import CharacterTalents from './CharacterTalents.vue'
import CharacterCons from './CharacterCons.vue'

const route = useRoute()
const appDataStore = useAppDataStore()

// 获取角色数据
const selectedCharacter = appDataStore.getCharacterById(route.params.id as string)
</script>
