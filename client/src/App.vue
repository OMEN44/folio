<script setup>
import NavigationBar from "@/components/NavigationBar.vue";
import Notification from "./components/Notification.vue";
import AccountLogin from "./components/AccountLogin.vue";
</script>

<template>
  <header>
    <navigation-bar />
  </header>
  <main>
    <AccountLogin />
    <Notification />
    <RouterView />
  </main>
</template>

<style>
main {
  margin: 30px 20px 0 20px;
}
</style>
