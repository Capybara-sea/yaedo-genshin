<template>
  <transition :name="name || 'slide-fade'" mode="out-in">
    <slot />
  </transition>
</template>

<script lang="ts" setup>
defineProps<{
  name?: 'slide-fade'
}>()
</script>

<style lang="scss" scoped>
.slide-fade- {
  &enter-active,
  &leave-active {
    transition: opacity 0.15s ease-in-out 0.05s, transform 0.2s ease-in;
  }
  &enter-from,
  &leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  &enter-to,
  &leave-from {
    opacity: 1;
  }
}
</style>
