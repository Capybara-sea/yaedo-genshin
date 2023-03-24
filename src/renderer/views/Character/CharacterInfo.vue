<template>
  <!-- 基本信息 -->
  <n-descriptions
    bordered
    ref="info"
    :column="desColumn"
    label-align="center"
    size="small"
    label-placement="left"
    :label-style="`width: ${50 / desColumn}%`"
    :content-style="`width: ${50 / desColumn}%`"
  >
    <n-descriptions-item label="所属">{{ character.affiliation }}</n-descriptions-item>
    <n-descriptions-item label="命星">{{ character.constellation }}</n-descriptions-item>
    <n-descriptions-item label="生日">{{ character.birthday }}</n-descriptions-item>
    <n-descriptions-item label="版本">{{ character.version }}</n-descriptions-item>
    <n-descriptions-item label="中文cv">{{ character.cv.chinese }}</n-descriptions-item>
    <n-descriptions-item label="日语cv">{{ character.cv.japanese }}</n-descriptions-item>
    <n-descriptions-item label="英语cv">{{ character.cv.english }}</n-descriptions-item>
    <n-descriptions-item label="韩语cv">{{ character.cv.korean }}</n-descriptions-item>
  </n-descriptions>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'
import { useBreakpoints } from '@/hooks'

defineProps<{ character: Character }>()

const info = ref<HTMLElement>()
const desColumn = useBreakpoints({ s: 1, m: 2, l: 4 }, info)
</script>
