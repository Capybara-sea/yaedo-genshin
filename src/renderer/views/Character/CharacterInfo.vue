<template>
  <div>
    <!-- 基本信息 -->
    <n-descriptions
      ref="description"
      bordered
      :column="descriptionColumn"
      style="margin-top: 20px"
      label-align="center"
      size="small"
      title="基本信息"
      label-placement="left"
    >
      <n-descriptions-item label="所属">{{ character.affiliation }}</n-descriptions-item>
      <n-descriptions-item label="命星">{{ character.constellation }}</n-descriptions-item>
      <n-descriptions-item label="生日">{{ character.birthday }}</n-descriptions-item>
      <n-descriptions-item label="版本">{{ character.version }}</n-descriptions-item>
    </n-descriptions>
  </div>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'
import { useBreakpoints } from '@/hooks'

defineProps<{ character: Character }>()

const description = ref<HTMLElement>()
const descriptionColumn = useBreakpoints({ s: 1, m: 2, l: 4 }, description)
</script>
