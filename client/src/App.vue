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

<style lang="scss">
main {
  margin: 30px 20px 0 20px;

  @media (max-width: 1000px) {
    margin: 30px 0 0 0;
    overflow-x: hidden;
  }
}
</style>
