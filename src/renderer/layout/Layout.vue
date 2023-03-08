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
    background-color: rgb(177, 223, 231);
    float: left;
    overflow: scroll;
  }
  #right {
    width: calc(100% - 200px);
    height: 100%;
    background-color: rgb(236, 236, 177);
    float: left;
    overflow: scroll;
  }
}
</style>
