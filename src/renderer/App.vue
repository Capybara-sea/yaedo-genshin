<script setup lang="ts">
import Layout from './layout/Layout.vue'

window.electronAPI.sendMessage('Hello from App.vue!')
</script>

<template>
  <Layout></Layout>
</template>

<style lang="scss">
</style>
