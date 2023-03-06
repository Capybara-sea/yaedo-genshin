<template>
  <div id="container">
    <div id="left">
      <Sidebar></Sidebar>
    </div>
    <div id="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './Sidebar.vue'
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;

  #left {
    width: 200px;
    height: 100%;
    background-color: #f00;
    float: left;
  }
  #right {
    width: calc(100% - 200px);
    height: 100%;
    background-color: #0f0;
    float: left;
  }
}
</style>
