<template>
  <div>
    <img v-for="image in character.talents.images" :key="image" :src="image" style="height: 3rem" />
  </div>
</template>

<script lang="ts" setup>
import type { Character } from '@/types/data'

defineProps<{ character: Character }>()
</script>
