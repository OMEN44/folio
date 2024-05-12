<script setup lang="ts">
import NavBar from './components/NavBar.vue';
</script>

<template>
  <nav-bar />
  <div class="div-view-container">
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
  /* width */
  ::-webkit-scrollbar {
    display: none;
  }

  .div-view-container {
    margin: 10px;
    background-color: var(--background);
    border: solid 2px var(--blue-border);
    border-radius: 5px;
    height: calc(100vh - 20px);
    overflow-x: hidden;
    overflow-y: scroll;



    h1 {
      margin: 0;
    }
  }
</style>
