<template>
  <n-statistic :label="label" :value="value">
    <template #suffix v-if="rank">
      <n-popover placement="bottom">
        <template #trigger>
          <span :style="fontSmall">({{ rank }})</span>
        </template>
        角色90级时的{{ label }}在全角色的排名
      </n-popover>
    </template>
  </n-statistic>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string
  value?: string | number
  rank?: string | number
}>()

const fontSmall = 'font-size: var(--font-size-small)'
</script>

<style lang="scss" scoped></style>
