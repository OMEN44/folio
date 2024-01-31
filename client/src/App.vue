<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import Notification from "./components/Notification.vue";
</script>

<template>
  <header>
    <navigation-bar />
  </header>
  <main>
    <Notification />
    <RouterView />
  </main>
</template>

<style>
main {
  margin: 30px 20px 0 20px;
}
</style>
