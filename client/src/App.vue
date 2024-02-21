<script setup lang="ts">
import NavigationBar from "./components/NavigationBar.vue";
import Notification from "./components/Notification.vue";
import AccountLogin from "./components/AccountLogin.vue";
import { User } from "./script/Account";
</script>

<template>
  <header>
    <navigation-bar />
  </header>
  <main>
    <AccountLogin />
    <Notification />
    <RouterView :key="User?.id" />
  </main>
</template>

<style>
main {
  margin: 30px 20px 0 20px;
}
</style>
