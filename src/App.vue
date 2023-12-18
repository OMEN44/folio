<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <header>
    <navigation-bar />
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
  main {
    margin: 30px 20px 0 20px;
  }
</style>
