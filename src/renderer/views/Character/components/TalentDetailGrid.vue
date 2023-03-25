<template>
  <n-table :bordered="false" :single-line="false" size="small" striped style="word-break: keep-all">
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
</template>

<script lang="ts" setup>
import type { ExtendedTalentDetail } from '../hooks/CharacterTalents'
defineProps<{
  talentDetail: ExtendedTalentDetail
}>()
</script>

<style lang="scss" scoped></style>
