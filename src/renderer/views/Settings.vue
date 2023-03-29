<template>
  <n-list hoverable :show-divider="false">
    <!-- 深色模式 -->
    <n-list-item>
      <n-thing
        title="深色模式"
        description="写样式真的好麻烦...浅色模式实在不会设计凑合着看吧..."
        description-style="text-align: left"
      />
      <template #suffix>
        <n-switch size="large" :default-value="darkSwitch" @update:value="triggerTheme">
          <template #checked-icon>
            <n-icon :component="DarkModeRound" color="#31322c" />
          </template>
          <template #unchecked-icon>
            <n-icon :component="LightModeRound" color="#db9b34" />
          </template>
        </n-switch>
      </template>
    </n-list-item>

    <!-- 版本信息 -->
    <n-list-item>
      <n-tag
        v-for="(item, key) in version"
        :key="key"
        type="info"
        style="margin-left: 1rem"
      >
        {{ key }} <n-divider vertical /> {{ item }}
      </n-tag>
    </n-list-item>
  </n-list>
</template>

<script lang="ts" setup>
import { useAppStore } from '@/store'
import { LightModeRound, DarkModeRound } from '@vicons/material'

const { $state, setTheme } = useAppStore()
const darkSwitch = Boolean($state.theme === 'dark')
const triggerTheme = (val: boolean) => setTheme(val ? 'dark' : 'light')

const version = window.api.version
</script>
